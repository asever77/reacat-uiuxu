import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import AboutPage from "../../app/(page)/(sub)/about/page";
import Header from "../../components/layout/Header";
import StoreProvider from "@/providers/StoreProvider";
import React from "react";

const meta: Meta<typeof AboutPage> = {
  title: "Pages/About",
  component: AboutPage,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: { pathname: "/about" },
    },
    layout: "fullscreen",
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ minHeight: "100vh", background: "#f8f8f8" }}>
        <StoreProvider>
          <Story />
        </StoreProvider>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WidthLayout: Story = {
  render: () => (
    <div style={{ width: 1024, margin: "0 auto", border: "1px solid #eee" }}>
      <Header />
      <AboutPage />
    </div>
  ),
};

export const PageOnly: Story = {
  render: () => <AboutPage />,
};

export const MobileWithLayout: Story = {
  render: () => (
    <div style={{ width: 375, margin: "0 auto", border: "1px solid #eee" }}>
      <AboutPage />
    </div>
  ),
};
