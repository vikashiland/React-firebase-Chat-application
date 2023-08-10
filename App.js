import Message from "./components/Message";

import {app} from "./firebase";
import { useEffect, useState,useRef } from "react";
import {
   Button,
   Box,
   Container,
   Input,
   VStack, 
   HStack,
   } from "@chakra-ui/react";

import {getAuth,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged, 
  signInWithPopup} from  "firebase/auth";

import {
  getFirestore,
  onSnapshot,
  addDoc,
  collection, 
  serverTimestamp,
  query,
  orderBy,
   } from "firebase/firestore";


const auth= getAuth(app);
const db = getFirestore(app);

const loginHandler = ()=>{
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth,provider)
}

const logoutHandler = () => signOut(auth);


function App() {
 const [user, setUser] = useState();
 console.log(user);
 const [message,SetMessage] = useState("");
 const [messages,SetMessages] = useState([]);
 
 const divForScroll =  useRef(null);
 const submitHandler = async(e) => {
  e.preventDefault();

 try {
  SetMessage("");
  await addDoc(collection(db, "Messages"),{
    text:message,
    uid:user.uid,
    uri: user.photoURL,
    createdAt: serverTimestamp(),
  });
  
  divForScroll.current.scrollIntoView( {behaviour: "smooth"});
} catch (error) {
  alert(error)
}};
  useEffect(()=>{
    const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"));

   const unsubsribe =  onAuthStateChanged(auth,(data)=>{
       setUser(data);
   });
      const unsubscribeForMessage= onSnapshot(q,(snap)=>{
        SetMessages(
          snap.docs.map((item) =>{
            const id = item.id;
            return {id, ...item.data()};
          })
       );
    });
    return () => {
      unsubsribe();
      unsubscribeForMessage();
    };
  },[]);
  return (
    <Box bg={"red.50"}>
      {
        user?(
          <Container
          backgroundColor={"blue.300"}
           borderRadius={"10px"} 
           h={"100vh"}
          marginLeft={"30%"} 
          width="30%" 
          border="4px dodgerblue solid"
          justifyContent={"center"} 
          bg={"white"}>
          <VStack h="full"  paddingY={2}>
           <HStack justifyItems={"flex-end"}>
           <Button onClick={logoutHandler} color={"white"}
           borderRadius={"5px"}
           padding="5px"
           backgroundColor={"blue.400"} >
               Logout
            </Button>
           </HStack>
  
            <VStack h="full" padding="5px" width={"full"} overflowY="auto" css={{"&::-webkit-scrollbar":{
              display:"none"
            }}} >
              {
                messages.map((item)=>(
                  <Message key={item.id} user={item.uid===user.uid?"me":"other"} text={item.text} uri={item.uri}/>
                ))
              }
            </VStack>

            <div ref={divForScroll}></div>
             <form onSubmit={submitHandler} style={{  width:"100%"}}>
            
              <HStack margin={"5px"}>
              <Input  padding="5px" value={message} borderRadius="5px" width="90%" backgroundColor={"whitesmoke"} border="1px solid black" onChange={(e) => SetMessage(e.target.value)} placeholder="Enter a Message....." />
              <Button color={"whiteAlpha.900"} borderRadius="5px" padding={"3px"} margin={"5px"} backgroundColor={"blue.600"}  type="submit">
                Send
              </Button>
                
              </HStack>
             </form>
          </VStack>
        </Container>
        ):(
         <Container>
          <HStack color="white" fontFamily={"arial"}fontSize="40px" backgroundColor={"dodgerblue"}
          height={"50px"} justifyContent={"center"} >
            <h1 >React Firebase Chat Application</h1>
          </HStack>
          <VStack
            backgroundColor={"dodgerblue"}>
            <Button onClick={loginHandler} margin={"100px"} color="white" padding={"5px"} borderRadius={"10px"} backgroundColor={"purple"}>Sign In with Google</Button>
            <HStack>
                
            </HStack>
          </VStack>
          </Container>
        )
      }
    </Box>
  );
};

export default App;
