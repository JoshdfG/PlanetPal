import StartProgramme from "@/components/programme/StartProgramme";

export default function Programme() {
    const apiKey = process.env.PINATA_API_KEY;
    const secretKey = process.env.PINATA_SECRET_API_KEY;

    return (
        <main className="w-full flex min-h-screen flex-col overflow-x-hidden">
            <StartProgramme apiKey={apiKey} secretKey={secretKey} />
        </main>
    )
}
