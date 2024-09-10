import { GiJourney } from "react-icons/gi";
import { GrTechnology } from "react-icons/gr";
import { RiTeamLine } from "react-icons/ri";
import { RxValue } from "react-icons/rx";
import { SiPagespeedinsights } from "react-icons/si";
import { TbDeviceVisionPro } from "react-icons/tb";


const AboutClassMate = () => {
    return (
        <section className="flex flex-col md:gap-12 gap-8 lg:my-36 md:my-20 my-20">
            <h1 className="font-bold text-color2 lg:text-4xl md:text-3xl text-3xl text-center">About Classmate+</h1>
            <main className="w-full grid lg:grid-cols-3 md:grid-cols-2 lg:gap-8 md:gap-6 gap-8 lg:px-20 px-4">
                {
                    classmateContents.map((item) => (
                        <div className="flex flex-col cursor-pointer group items-start bg-color2 px-8 py-12 rounded-md" key={item.id}>
                            <div className="bg-white h-12 w-12 rounded-full flex items-center justify-center text-color2 group-hover:bg-color1">
                                {item.icon}
                            </div>
                            <h1 className="text-white mt-8 font-semibold">{item.title}</h1>
                            <p className="text-gray-200 mt-3 text-sm">{item.text}</p>
                        </div>
                    ))
                }


            </main>
        </section>
    )
}

export default AboutClassMate

type ClassmateContentsType = {
    id: number,
    title: string,
    text: string,
    icon: JSX.Element
}

const classmateContents: ClassmateContentsType[] = [
    {
        id: 1,
        title: 'Our Mission',
        text: 'At Classmate, our mission is to revolutionize the educational landscape by leveraging blockchain technology to create secure, efficient, and transparent student management and attendance systems. We aim to empower educational institutions with tools that simplify administrative tasks, enhance productivity, and foster academic success.',
        icon: <SiPagespeedinsights className="text-xl text-color2 group-hover:text-white" />
    },
    {
        id: 2,
        title: 'Our Vision',
        text: 'We envision a future where educational institutions worldwide can rely on seamless, automated processes for student management and attendance. By harnessing the power of blockchain, we strive to set new standards in data security, transparency, and operational efficiency in the education sector.',
        icon: <TbDeviceVisionPro className="text-xl text-color2 group-hover:text-white" />
    },
    {
        id: 3,
        title: 'Our Technology',
        text: 'Classmate is built on cutting-edge blockchain technology, ensuring that all student data and attendance records are securely stored and immutably logged. This decentralized approach eliminates single points of failure and provides unparalleled security and transparency, making Classmate a trusted platform for educational institutions.',
        icon: <GrTechnology className="text-xl text-color2 group-hover:text-white" />
    },
    {
        id: 4,
        title: 'Our Team',
        text: 'Our team comprises dedicated professionals with extensive experience in blockchain technology, education, and software development. We are passionate about creating innovative solutions that address the unique challenges faced by educational institutions. Meet the minds behind Classmate and learn about their contributions to our mission.',
        icon: <RiTeamLine className="text-xl text-color2 group-hover:text-white" />
    },
    {
        id: 5,
        title: 'Our Values',
        text: 'We are dedicated to innovation, security, transparency, efficiency, collaboration, and commitment. We push the boundaries of technology, ensuring the highest level of data security, fostering trust through transparency, and enhancing operational efficiency.',
        icon: <RxValue className="text-xl text-color2 group-hover:text-white" />
    },
    {
        id: 6,
        title: 'Our Journey',
        text: 'Since our inception, Classmate has been on a mission to innovate and improve the education sector. Learn about our journey, milestones, and the continuous efforts we make to enhance our platform and better serve educational institutions.',
        icon: <GiJourney className="text-xl text-color2 group-hover:text-white" />
    }
]