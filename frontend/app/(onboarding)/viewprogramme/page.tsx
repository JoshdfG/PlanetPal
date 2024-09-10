import Programmes from "@/components/programme/Programmes";

export default function ViewProgramme() {
    const apiKey = process.env.PINATA_API_KEY;
    const secretKey = process.env.PINATA_SECRET_API_KEY;
    return (
        <main className="w-full flex min-h-screen flex-col overflow-x-hidden">
            <Programmes apiKey={apiKey} secretKey={secretKey} />
        </main>
    )
}