import ContactInfo from "@/components/contact/ContactInfo";
import Map from "@/components/contact/Map";
import Support from "@/components/contact/Support";

export default function Contact() {
    return (
        <main className="w-full flex min-h-screen flex-col overflow-x-hidden">
            <Support />
            <Map />
            <ContactInfo />
        </main>
    )
}