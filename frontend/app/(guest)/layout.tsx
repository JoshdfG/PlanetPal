import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";


export default function GuestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-full">
      <Header />
      <main className="w-full">{children}</main>
      <Footer />
    </section>
  );
}
