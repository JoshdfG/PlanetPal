'use client'
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from 'react';
import useGetAllStats from '@/hooks/guestHook/useGetAllStats';

const options: ApexOptions = {
    chart: {
        width: 380,
        type: 'pie',
    },
    labels: ['Total Organisations', 'Total Students', 'Total Mentors', 'Total Classes', 'Total Attendance Signed'],
    colors: ['#725D1D', '#374151', '#f59e0b', '#557ab5', '#e4732c'],
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 340
            },
            legend: {
                position: 'bottom'
            }
        }
    }],
    legend: {
        position: 'bottom'
    },
}

const Piechart = () => {
    const initialData = {
        series: [42, 47, 52, 58, 65]
    }

    const [data, setData] = useState(initialData)

    const { statsData, isLoading } = useGetAllStats()

    useEffect(() => {

        if (!isLoading) {
            setData({
                series: [
                    statsData?.totalOrganisations,
                    statsData?.totalStudents,
                    statsData?.totalMentors,
                    statsData?.totalClasses,
                    statsData?.totalSignedAttendance
                ]
            })
        }
    }, [statsData?.totalOrganisations,
    statsData?.totalStudents,
    statsData?.totalMentors,
    statsData?.totalClasses,
    statsData?.totalSignedAttendance, isLoading])


    return (
        <div className="w-full">
            <ReactApexChart options={options} series={data.series} type="pie" height={380} />
        </div>
    )
}

export default Piechart