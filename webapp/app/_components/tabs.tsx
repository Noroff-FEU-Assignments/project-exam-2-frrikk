"use client";

import * as React from "react";
import { Tabs } from "@mui/base/Tabs";
import { TabsList } from "@mui/base/TabsList";
import { TabPanel } from "@mui/base/TabPanel";
import { Tab } from "@mui/base/Tab";
import PostsPage from "@/app/_components/post-page";
import ProfilePage from "@/app/_components/profile-page";

export default function HomeTabs() {
  return (
    <Tabs defaultValue={0} className="flex justify-center flex-col mt-2">
      <TabsList className="flex bg-pastel-green text-white font-semibold px-2 rounded-lg py-2 min-w-[275px]">
        <Tab
          slotProps={{
            root: ({ selected }) => ({
              className: `${
                selected
                  ? "text-pastel-green bg-white"
                  : "text-white bg-transparent focus:text-white hover:bg-purple-400"
              }  text-sm font-bold w-full p-2 m-1.5 border-0 rounded-lg flex justify-center focus:outline-0 focus:shadow-outline-purple-light`,
            }),
          }}
          value={0}
        >
          Posts
        </Tab>
        <Tab
          slotProps={{
            root: ({ selected }) => ({
              className: `${
                selected
                  ? "text-pastel-green bg-white"
                  : "text-white bg-transparent focus:text-white hover:bg-purple-400"
              }  text-sm font-bold w-full p-2 m-1.5 border-0 rounded-lg flex justify-center focus:outline-0 focus:shadow-outline-purple-light`,
            }),
          }}
          value={1}
        >
          Profiles
        </Tab>
      </TabsList>
      <TabPanel value={0}>
        <PostsPage />
      </TabPanel>
      <TabPanel value={1}>
        <ProfilePage />
      </TabPanel>
    </Tabs>
  );
}
