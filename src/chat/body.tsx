import { Message } from "./message";

export function Body() {
  return (
    <div class="flex flex-col absolute bottom-0 h-full  text-white overflow-hidden">
      <div class="flex flex-col flex-1 overflow-y-auto space-y-1
        [&::-webkit-scrollbar]:w-4.75 
        [&::-webkit-scrollbar-thumb]:bg-gray-400 
        [&::-webkit-scrollbar-thumb]:border-2
        [&::-webkit-scrollbar-thumb]:border-solid 
        [&::-webkit-scrollbar-thumb]:min-h-7.5
        ">
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
    </div>
  )
}
