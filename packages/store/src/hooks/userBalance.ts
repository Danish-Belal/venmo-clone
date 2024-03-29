import { useRecoilValue } from "recoil";
import { balanceAtom } from "../atoms/balance";

export const userBalance = () =>{
     const vlaue = useRecoilValue(balanceAtom);
     return vlaue;

}