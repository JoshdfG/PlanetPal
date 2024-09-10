import Footer from "@/components/shared/Footer";
import OnboardingHeader from "@/components/shared/OnboardingHeader";


export default function OnboardingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="w-full">
            <OnboardingHeader />
            <main className="w-full mt-20 lg:px-16 px-4 lg:py-12 md:py-0 py-10">{children}</main>
            <Footer />
        </section>
    );
}