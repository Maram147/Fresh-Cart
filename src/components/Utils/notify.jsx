import toast from "react-hot-toast";


export const notify = ({msg,type}) =>{ 
    toast[type](msg)
};