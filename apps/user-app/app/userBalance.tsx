"use client"

import {userBalance} from '@repo/store/useBalance'

export default function Balance() {
     const balance = userBalance();
     return (
          <div>
               Hii there {balance}
          </div>
     )
}