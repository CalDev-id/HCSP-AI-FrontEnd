import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SignIn from "./auth/signin/page";
import HomePage from "./home/page";

export const metadata: Metadata = {
  title:
    "HCSP-AI",
  description: "HCAI is a platform for managing and monitoring AI models, providing tools for deployment, scaling, and performance tracking.",
};

export default function Home() {
  return (
    <>
      {/* <DefaultLayout>
        <ECommerce />
      </DefaultLayout> */}
      {/* <SignIn /> */}
      {/* <Home /> */}
      <HomePage />
    </>
  );
}
