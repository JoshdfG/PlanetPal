import AttendenceNFT from "@/components/admin/AttendenceNFT";

export default function Attendence() {
    const apiKey = process.env.PINATA_API_KEY;
    const secretKey = process.env.PINATA_SECRET_API_KEY;
    return (
        <main className="w-full flex flex-col overflow-x-hidden">
            <AttendenceNFT apiKey={apiKey} secretKey={secretKey} />
        </main>
    );
}