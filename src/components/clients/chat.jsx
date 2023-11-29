"use client";
import { Textarea } from "../ui/textarea";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";
import logo from "../../lib/mindcase_logo.jpeg";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { data } from "autoprefixer";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
const getChatList = async () => {
  const supabase = createClientComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("chat")
    .select()
    .eq("userid", user.id)
    .order("chatid", { ascending: false });
  return { data, error };
};
export const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [hover, setHover] = useState(false);
  const [chatList, setChatlist] = useState([]);
  const params = useParams();
  const supabase = createClientComponentClient();
  const router = useRouter();
  useEffect(() => {
    getChatList().then(({ data, error }) => {
      setChatlist(data);
    });
    if (data.length > 1) setOldlist(data);
  }, []);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    router.push("/chat");
    if (error) router.refresh();
  }
  function removeNumbersFromEnd(str) {
    const regex = /\d+$/;
    const newStr = str.replace(regex, "");
    return newStr;
  }
  return (
    <>
      <div
        className={`h-screen overflow-hidden bg-black relative ${
          open ? "w-[28%]" : "w-0"
        }`}
      >
        {hover && (
          <div className="absolute top-0 z-50 left-0 w-full h-full bg-gray-900 bg-opacity-25"></div>
        )}
        <div className="w-fill max-w-[90%] h-10%">
          <Link href={"/chat"}>
            {" "}
            <Button className="w-full bg-transparent hover:bg-slate-700  relative text-left p-5 rounded-lg m-3">
              <div className="relative text-lg text-left -left-[5vmax]">
                New chat
              </div>{" "}
              <svg
                width="25"
                height="25"
                viewBox="0 0 15 15"
                className="absolute right-4"
                fill="stretch"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.1464 1.14645C12.3417 0.951184 12.6583 0.951184 12.8535 1.14645L14.8535 3.14645C15.0488 3.34171 15.0488 3.65829 14.8535 3.85355L10.9109 7.79618C10.8349 7.87218 10.7471 7.93543 10.651 7.9835L6.72359 9.94721C6.53109 10.0435 6.29861 10.0057 6.14643 9.85355C5.99425 9.70137 5.95652 9.46889 6.05277 9.27639L8.01648 5.34897C8.06455 5.25283 8.1278 5.16507 8.2038 5.08907L12.1464 1.14645ZM12.5 2.20711L8.91091 5.79618L7.87266 7.87267L8.12731 8.12732L10.2038 7.08907L13.7929 3.5L12.5 2.20711ZM9.99998 2L8.99998 3H4.9C4.47171 3 4.18056 3.00039 3.95552 3.01877C3.73631 3.03668 3.62421 3.06915 3.54601 3.10899C3.35785 3.20487 3.20487 3.35785 3.10899 3.54601C3.06915 3.62421 3.03669 3.73631 3.01878 3.95552C3.00039 4.18056 3 4.47171 3 4.9V11.1C3 11.5283 3.00039 11.8194 3.01878 12.0445C3.03669 12.2637 3.06915 12.3758 3.10899 12.454C3.20487 12.6422 3.35785 12.7951 3.54601 12.891C3.62421 12.9309 3.73631 12.9633 3.95552 12.9812C4.18056 12.9996 4.47171 13 4.9 13H11.1C11.5283 13 11.8194 12.9996 12.0445 12.9812C12.2637 12.9633 12.3758 12.9309 12.454 12.891C12.6422 12.7951 12.7951 12.6422 12.891 12.454C12.9309 12.3758 12.9633 12.2637 12.9812 12.0445C12.9996 11.8194 13 11.5283 13 11.1V6.99998L14 5.99998V11.1V11.1207C14 11.5231 14 11.8553 13.9779 12.1259C13.9549 12.407 13.9057 12.6653 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.6653 13.9057 12.407 13.9549 12.1259 13.9779C11.8553 14 11.5231 14 11.1207 14H11.1H4.9H4.87934C4.47686 14 4.14468 14 3.87409 13.9779C3.59304 13.9549 3.33469 13.9057 3.09202 13.782C2.7157 13.5903 2.40973 13.2843 2.21799 12.908C2.09434 12.6653 2.04506 12.407 2.0221 12.1259C1.99999 11.8553 1.99999 11.5231 2 11.1207V11.1206V11.1V4.9V4.87935V4.87932V4.87931C1.99999 4.47685 1.99999 4.14468 2.0221 3.87409C2.04506 3.59304 2.09434 3.33469 2.21799 3.09202C2.40973 2.71569 2.7157 2.40973 3.09202 2.21799C3.33469 2.09434 3.59304 2.04506 3.87409 2.0221C4.14468 1.99999 4.47685 1.99999 4.87932 2H4.87935H4.9H9.99998Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Button>
          </Link>
        </div>
        <div className="flex flex-col  overflow-x-hidden overflow-y-scroll w-full h-[calc(100vh-15%)] remove-scrollbar ">
          {chatList &&
            chatList.map((data, i) => (
              <>
                <Link
                  key={i}
                  href={`/chat/${data.chatid}`}
                  title={data.title}
                  className={`pl-[2rem] ${
                    parseInt(params.chatId) === parseInt(data.chatid)
                      ? "bg-[#252525]"
                      : ""
                  } relative py-2 px-2 hover:bg-slate-600 rounded-md w-[calc(100%-15%)] block mx-auto min-h-fit max-h-[3.4vmax]  text-ellipsis overflow-hidden`}
                >
                  <div className="absolute -left-[0.02vmax] pl-1">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 15 15"
                      className=""
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.5 3L2.5 3.00002C1.67157 3.00002 1 3.6716 1 4.50002V9.50003C1 10.3285 1.67157 11 2.5 11H7.50003C7.63264 11 7.75982 11.0527 7.85358 11.1465L10 13.2929V11.5C10 11.2239 10.2239 11 10.5 11H12.5C13.3284 11 14 10.3285 14 9.50003V4.5C14 3.67157 13.3284 3 12.5 3ZM2.49999 2.00002L12.5 2C13.8807 2 15 3.11929 15 4.5V9.50003C15 10.8807 13.8807 12 12.5 12H11V14.5C11 14.7022 10.8782 14.8845 10.6913 14.9619C10.5045 15.0393 10.2894 14.9965 10.1464 14.8536L7.29292 12H2.5C1.11929 12 0 10.8807 0 9.50003V4.50002C0 3.11931 1.11928 2.00003 2.49999 2.00002Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>{" "}
                  {removeNumbersFromEnd(data.title)}
                </Link>
              </>
            ))}
          {data.length < 1 &&
            oldlist.length > 1 &&
            oldlist.map((data, i) => (
              <>
                <Link
                  key={i}
                  href={`/chat/${data.chatid}`}
                  title={data.title}
                  className={`pl-[2rem] ${
                    parseInt(params.chatId) === parseInt(data.chatid)
                      ? "bg-[#252525]"
                      : ""
                  } relative py-2 px-2 hover:bg-slate-600 rounded-md w-[calc(100%-15%)] block mx-auto min-h-fit max-h-[3.4vmax]  text-ellipsis overflow-hidden`}
                >
                  <div className="absolute -left-[0.02vmax] pl-1">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 15 15"
                      className=""
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.5 3L2.5 3.00002C1.67157 3.00002 1 3.6716 1 4.50002V9.50003C1 10.3285 1.67157 11 2.5 11H7.50003C7.63264 11 7.75982 11.0527 7.85358 11.1465L10 13.2929V11.5C10 11.2239 10.2239 11 10.5 11H12.5C13.3284 11 14 10.3285 14 9.50003V4.5C14 3.67157 13.3284 3 12.5 3ZM2.49999 2.00002L12.5 2C13.8807 2 15 3.11929 15 4.5V9.50003C15 10.8807 13.8807 12 12.5 12H11V14.5C11 14.7022 10.8782 14.8845 10.6913 14.9619C10.5045 15.0393 10.2894 14.9965 10.1464 14.8536L7.29292 12H2.5C1.11929 12 0 10.8807 0 9.50003V4.50002C0 3.11931 1.11928 2.00003 2.49999 2.00002Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>{" "}
                  {removeNumbersFromEnd(data.title)}
                </Link>
              </>
            ))}
        </div>
        <div className="w-[80%] h-10% absolute bottom-2">
          <Button onClick={signOut} className="w-[100%] relative left-[10%]">
            <div className="absolute left-6">Logout </div>{" "}
            <svg
              width="20"
              height="20"
              viewBox="0 0 15 15"
              fill="none"
              className="absolute right-5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 1C2.44771 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H10.5C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13H3V2L10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1H3ZM12.6036 4.89645C12.4083 4.70118 12.0917 4.70118 11.8964 4.89645C11.7012 5.09171 11.7012 5.40829 11.8964 5.60355L13.2929 7H6.5C6.22386 7 6 7.22386 6 7.5C6 7.77614 6.22386 8 6.5 8H13.2929L11.8964 9.39645C11.7012 9.59171 11.7012 9.90829 11.8964 10.1036C12.0917 10.2988 12.4083 10.2988 12.6036 10.1036L14.8536 7.85355C15.0488 7.65829 15.0488 7.34171 14.8536 7.14645L12.6036 4.89645Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </Button>
        </div>
      </div>
      <div
        onClick={() => setOpen(!open)}
        className={`absolute top-1/2 ${open ? "left-[22%]" : "left-2"}`}
      >
        {open ? (
          <div
            className="flex flex-col justify-center justify-items-end p-3 "
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            title="Close Sildebar"
          >
            <div
              className={`w-1 h-4 rounded-sm bg-gray-500 transition duration-200 ease-linear  ${
                hover && "rotate-12 bg-white"
              }`}
            ></div>
            <div
              className={`w-1 h-4  rounded-sm -translate-y-1 bg-gray-500 transition duration-200 ease-linear ${
                hover && "-rotate-12 bg-white"
              }`}
            ></div>
          </div>
        ) : (
          <div
            className="flex flex-col justify-center justify-items-end p-3 rotate-180 "
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            title="Open Slidebar"
          >
            <div
              className={`w-1 h-4 rounded-sm  bg-gray-500 transition duration-300 ease-linear ${
                hover && "rotate-12 bg-white"
              }`}
            ></div>
            <div
              className={`w-1 h-4 rounded-sm -translate-y-1 transition duration-300 ease-linear bg-gray-500 ${
                hover && "-rotate-12 bg-white"
              }`}
            ></div>
          </div>
        )}
      </div>
    </>
  );
};

const Message = ({ role, content }) => {
  const supabase = createClientComponentClient();

  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setSession(user);
    });
  }, []);

  return (
    <>
      <div
        className={`grid grid-cols-[30px_1fr] gap-5 p-5 ${
          role === "user" ? "" : "bg-[#00000049]"
        }`}
      >
        <div>
          {role === "user" ? (
            session?.image ? (
              <Image
                width={40}
                height={40}
                className="rounded-sm text-sm shadow-sm shadow-black/10"
                src={session?.image}
                alt="YOU"
              />
            ) : (
              <svg
                width="30"
                height="30"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="invert-[100%] rounded-sm shadow-sm shadow-black/10 bg-white text-black p-1"
              >
                <path
                  d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            )
          ) : (
            <Image
              width={40}
              height={40}
              className="rounded-sm invert-[100%] shadow-sm shadow-white/10"
              src={logo}
              alt="bot"
            />
          )}
        </div>
        <Markdown
          remarkPlugins={[remarkGfm]}
          className="max-w-[100%] prose prose-invert"
        >
          {content}
        </Markdown>
      </div>
    </>
  );
};
const createNewChat = async (title, uid) => {
  const newTitle = `${title} ${Date.now()}`;
  await supabase.from("chat").insert({ title: newTitle, userid: uid });
  let { data, error } = await supabase
    .from("chat")
    .select("chatid")
    .eq("title", newTitle)
    .eq("userid", uid);
  data = data[0].chatid;
  return { data, error };
};
const sendMessage = async (chatid, human, assistant) => {
  const supabase = createClientComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let newChatid = chatid;
  if (!chatid) {
    const { data, error } = await createNewChat(human, user.id);
    newChatid = data;
  }
  console.log(newChatid);
  const { data, error } = await supabase.from("message").insert({
    chatid: newChatid,
    userid: user.id,
    human,
    assistant,
  });
  console.log(data, error);
  return newChatid;
};
const getMessagesByChat = async (chatid) => {
  if (!chatid) {
    return { data: [], error: "chat id not found" };
  }
  const supabase = createClientComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("message")
    .select()
    .eq("chatid", chatid)
    .eq("userid", user?.id);
  return { data, error };
};

export const Query = () => {
  const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true,
  });
  // const openai = new OpenAI({
  //   apiKey: "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",
  //   dangerouslyAllowBrowser: true,
  // });
  const [textareatext, setTextareatext] = useState("");
  const [asistantmessage, setAssistantmessage] = useState("");
  const [usernewchat, setUsernewchat] = useState("");
  const [boolresponse, setBoolresponse] = useState(false);
  const [data, setData] = useState([]);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    getMessagesByChat(parseInt(params?.chatId)).then(({ data, error }) => {
      setData(data);
      console.log(error);
    });
    if (boolresponse === false && asistantmessage.length > 1)
      sendMessage(parseInt(params?.chatId), textareatext, asistantmessage).then(
        (newChatid) => {
          router.push(`/chat/${newChatid}`);
          setTextareatext("");
          setAssistantmessage("");
        }
      );
  }, [boolresponse]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBoolresponse(true);
    setUsernewchat(textareatext);
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant, you are build to help lawyers.",
        },
        { role: "user", content: textareatext },
      ],

      stream: true,
    });

    for await (const chunk of completion) {
      setAssistantmessage((p) =>
        chunk.choices[0].delta.content ? p + chunk.choices[0].delta.content : p
      );
    }

    setBoolresponse(false);
  };

  return (
    <>
      <div className="h-screen w-full max-w-[80%]">
        <div className="container w-80% h-[calc(100vh-15%)] overflow-hidden whitespace-normal ">
          <div className="h-[10%] p-4 text inline-block">
            Case GPT <p className="text-xs inline-block">powerd by openai</p>
          </div>
          <div className="conainer w-60% h-full p-[6vmax] m-auto whitespace-normal overflow-auto overflow-y-scroll remove-scrollbar">
            {data &&
              data.map((message, i) => (
                <div key={i}>
                  {" "}
                  <Message role={"user"} content={message.human} />
                  <Message role={"assistant"} content={message.assistant} />
                </div>
              ))}
            {usernewchat && <Message role={"user"} content={usernewchat} />}
            {asistantmessage && (
              <Message role="assistant" content={asistantmessage} />
            )}
            {data.length < 1 &&
              !params.chatId &&
              usernewchat === "" &&
              asistantmessage === "" && (
                <>
                  <div className="absolute top-1/3 left-1/2 text-xl font-extrabold">
                    <div className="text-center w-full relative top-0 left-[27%] m-3">
                      <Image
                        src={logo}
                        alt="logo"
                        className="w-[7vmax] h-[7vmax] rounded-[100%] "
                      ></Image>
                    </div>
                    How can I help you today?
                  </div>
                </>
              )}
            {data.length < 1 &&
              params.chatId &&
              usernewchat === "" &&
              asistantmessage === "" && (
                <>
                  <div className="absolute top-[10%] left-[2%] text-xl font-extrabold">
                    . . .{" "}
                  </div>
                </>
              )}
            {data.length < 1 &&
              params.chatId &&
              usernewchat === "" &&
              asistantmessage === "" && (
                <>
                  <div className="absolute top-[25%] left-[32%] text-xl font-extrabold">
                    . . .{" "}
                  </div>
                </>
              )}
          </div>
        </div>
        <div className="w-full h-[15%] relative  ">
          <div className="relative w-full">
            <Textarea
              placeholder={boolresponse ? "" : `Message CaseGPT...`}
              onChange={(e) => setTextareatext(e.target.value)}
              value={textareatext}
              className="w-[70%] p-3 pr-[4vmax] m-auto  rounded-[1vmax] resize-none focus:border-0 border-none focus:outline focus:outline-[0.25px] outline outline-[0.25px] outline-gray-600 focus:outline-gray-200 focus:shadow-none"
            />
          </div>
          <Button
            disabled={boolresponse}
            className="absolute left-[80%] rounded-sm p-0 top-3 bg-transparent text-black"
            onClick={(e) => handleSubmit(e)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              viewBox="0 0 16 16"
              className={`bi bi-arrow-up-square invert-[100%] bg-white text-black ${
                textareatext.length > 1 || boolresponse
                  ? "opacity-100"
                  : "opacity-30"
              }`}
            >
              <path
                fillRule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"
              />
            </svg>
          </Button>
        </div>
      </div>
    </>
  );
};
