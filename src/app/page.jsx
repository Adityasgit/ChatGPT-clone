import { Display, LogSigButt } from "../components/clients/login";
import Image from "next/image";
import logo from "../lib/mindcase_logo.jpeg";
export default function Home() {
  return (
    <>
        <div className="flex flex-row w-screen container bg-white h-screen p-0">
          <div className="sm:w-[60%] bg-[#ffffdb]">
            <div className="absolute top-4 left-9 text-2xl font-bold text-[#fe7600]">
              CaseGPT{" "}
              <p className=" bg-[#fe7600] w-5 h-5 rounded-[50%] absolute top-1.5 -right-6"></p>
            </div>
            <div>
              <Display />
            </div>
          </div>
          <div className="flex flex-col w-[40%] max-sm:w-full">
            <div className="h-[80%] flex flex-col justify-center items-center">
              <h1 className="text-3xl font-bold">Get started</h1>
              <LogSigButt />
            </div>
            <div className="h-[20%]">
              <div className="flex flex-row justify-center align-middle text-center p-5 pb-2">
                <Image
                  width={40}
                  height={40}
                  src={logo}
                  className="rounded-[50%] object-cover invert-[100%]"
                />
                <p className="my-auto pl-1 text-gray-500">MindCase</p>
              </div>
              <div className="flex flex-row justify-center align-middle text-center text-sm text-gray-600">
                {" "}
                Terms of use | Privacy policy
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
