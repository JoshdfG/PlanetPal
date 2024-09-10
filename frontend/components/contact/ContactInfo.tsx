'use client'
import Link from "next/link"
import { FormEvent, useState } from "react"
import { IoMdMail } from "react-icons/io"
import { IoLocation } from "react-icons/io5"
import { MdCall } from "react-icons/md"
import { FiSend } from "react-icons/fi";

const ContactInfo = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    }

    return (
        <section className="w-full grid md:grid-cols-2 gap-8 lg:px-12 md:px-8 px-3 mb-16">
            <main className="w-full flex flex-col md:p-10 p-9 gap-4 bg-color2 rounded-md">
                <div className="flex flex-col mb-7">
                    <h1 className="font-bold text-white text-2xl text-left">Contact Information</h1>
                    <h3 className=" text-white text-lg text-left">Feel free to inquire about anything and we would respond !</h3>
                </div>
                <div className="flex flex-col gap-4">
                    <Link href="tel:+2348060243641" className="flex text-white gap-1 items-center">
                        <MdCall className="text-lg " />
                        <span>(+234)8060243641</span>
                    </Link>
                    <Link href="mailto:support@web3bridge.com" className="flex gap-1 text-white items-center">
                        <IoMdMail className="text-lg" />
                        <span>support@web3bridge.com</span>
                    </Link>
                    <div className="flex text-white text-base gap-1 items-start">
                        <IoLocation className="md:text-2xl text-4xl" />
                        <p>1/3 Adebola Gbadebo Drv. (Adebola House) Off Abadek Avenue, off Akin Ogunlewe Rd, Igbogbo, Ikorodu, Lagos</p>
                    </div>
                </div>
            </main>
            <main className="w-full flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="font-bold text-color3 text-2xl text-left">Contact Form</h1>
                    <p className=" text-color2 text-lg text-left">Need Assistance? Reach out to us</p>
                </div>
                <form className="w-full grid lg:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-color3 font-medium ml-1">Name</label>
                        <input type="text" name="name" id="name" placeholder="Enter your name" className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-color3" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-color3 font-medium ml-1">Email</label>
                        <input type="email" name="email" id="email" placeholder="Enter your email" className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-color3" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="flex flex-col lg:col-span-2">
                        <label htmlFor="subject" className="text-color3 font-medium ml-1">Subject</label>
                        <input type="text" name="subject" id="subject" placeholder="Enter subject" className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-color3" value={subject} onChange={e => setSubject(e.target.value)} />
                    </div>
                    <div className="flex flex-col lg:col-span-2">
                        <label htmlFor="message" className="text-color3 font-medium ml-1">Message</label>
                        <textarea name="message" id="message" placeholder="Type your message here..." className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-color3 resize-y" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    </div>
                    <div className="flex flex-col items-start lg:col-span-2 mt-3">
                        <button type="submit" className="py-3 px-6 bg-color2 text-white flex items-center gap-1 rounded-lg">Send <FiSend className="text-lg" /></button>
                    </div>
                </form>
            </main>
        </section>
    )
}

export default ContactInfo