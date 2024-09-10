import Image from "next/image"
import SupportImg from "../../public/guest/Support.svg"

const Support = () => {
    return (
        <>
            <section className="w-full mt-20 lg:h-[420px] md:h-[350px] grid md:grid-cols-2 gap-6 md:gap-0 lg:px-16 px-4 lg:py-12 md:py-0 py-10 ">
                <main className='md:h-full flex flex-col order-2 md:order-1 justify-center items-start md:gap-6 gap-4 md:pr-8'>
                    <small className="block">24/7 CUSTOMER SUPPORT</small>
                    <h1 className="lg:text-4xl md:text-3xl text-2xl text-color2 font-bold">Need Assistance? Contact Us</h1>
                    <p className="text-color3 md:text-lg">Classmate+ values your questions, feedbacks, and inquiries. We believe in fostering an open communication with our customers and partners.</p>
                </main>
                <main className='md:h-full flex flex-col order-1 md:order-2 justify-center items-center'>

                    <Image src={SupportImg} alt="HeroImage" width={400} height={400} quality={100} className="object-contain" priority />

                </main>
            </section>
            <div className="patternbg w-full lg:h-12 md:h-10 h-8"></div>
        </>
    )
}

export default Support