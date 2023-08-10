import {HStack,Text,Avatar} from "@chakra-ui/react";

const Message = ({text,uri,user = "other"}) => {
  return (
       <HStack alignSelf={user === "me" ? "flex-end" : "flex-start"} borderRadius={"base"} bg="gray.100" paddingY={"2"} paddingX={user === "me" ? "4" :"2" }>
           {
            user === "other" && <Avatar padding="4px" width={"32px"} height={"22px"} src={uri}/>
           }
            <Text>{text}</Text>
            {
              user === "me" && <Avatar padding="4px" width={"32px"} height="{22px}" src={uri}/>
            }
       </HStack>
  );
};

export default Message;
