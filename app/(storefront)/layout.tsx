import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { NavBar } from "@/components/navigation/NavBar";
import { Footer } from "@/components/layout/Footer";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
