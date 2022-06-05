import Image from "next/image";
import React from "react";
import {
  HomeIcon,
  ChevronDownIcon,
  SearchIcon,
  MenuIcon,
} from "@heroicons/react/solid";
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";

function Header() {
  const { data: session } = useSession();

  console.log("session", session);
  return (
    <div className="flex bg-white z-50 px-4 shadow-sm static top-0 ">
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <Image
          objectFit="contain"
          src="https://links.papareact.com/fqy"
          layout="fill"
        />
      </div>
      <div className="flex items-center mx-7 xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="ml-2 hidden flex-1 lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>
      <form className="flex flex-1 items-center space-x-2 border px-3 py-1 rounded-sm border-gray-200 bg-gray-100">
        <SearchIcon className="h-6 w-6 text-gray-400" />
        <input
          type="text"
          placeholder="Search Redit"
          className="flex-1 bg-transparent outline-none"
        />
        <button type="button"></button>
      </form>
      <div className=" text-gray-500 items-center space-x-2 mx-5 hidden lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerphoneIcon className="icon" />
      </div>
      <div>
        <MenuIcon className="icon flex items-center lg:hidden ml-5" />
      </div>
      {session ? (
        <div
          onClick={() => signOut()}
          className="hidden cursor-pointer items-center space-x-2 border border-gray-100 p-2 lg:flex"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image src="http://links.papareact.com/23l" layout="fill" alt="" />
          </div>
          <p className="truncate">{session?.user?.name}</p>
          <p className="text-gray-400">Sign Out</p>
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="hidden cursor-pointer items-center space-x-2 border border-gray-100 p-2 lg:flex"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image src="http://links.papareact.com/23l" layout="fill" alt="" />
          </div>
          <p className="text-gray-400">Sign In</p>
        </div>
      )}
    </div>
  );
}

export default Header;
