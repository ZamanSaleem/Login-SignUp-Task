import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaRegStar } from "react-icons/fa";
import { FaShareAlt, FaThumbsUp } from "react-icons/fa";

const data = [
  { name: "Jan", 2019: 40, 2020: 30 },
  { name: "Feb", 2019: 50, 2020: 25 },
  { name: "Mar", 2019: 30, 2020: 45 },
  { name: "Apr", 2019: 60, 2020: 35 },
  { name: "May", 2019: 40, 2020: 20 },
  { name: "Jun", 2019: 70, 2020: 50 },
];

export default function Home() {
  return (
    <div className="p-5 flex flex-wrap gap-6 bg-gray" >
      
      <Card className="flex-1 min-w-[200px] p-4 flex flex-col items-center text-white bg-blue-700">
        <h3 className="text-lg">Earning</h3>
        <p className="text-2xl font-bold">$628</p>
      </Card>
      
     
      <Card className="flex-1 min-w-[200px] p-4 flex items-center justify-between">
        <p className="text-xl">Share</p>
        <FaShareAlt className="text-orange-500 text-2xl" />
        <p className="text-2xl font-bold">2434</p>
      </Card>
      
      
      <Card className="flex-1 min-w-[200px] p-4 flex items-center justify-between">
        <p className="text-xl">Likes</p>
        <FaThumbsUp className="text-yellow-500 text-2xl" />
        <p className="text-2xl font-bold">1259</p>
      </Card>
      
      
      <Card className="flex-1 min-w-[200px] p-4 flex items-center justify-between">
        <p className="text-xl">Rating</p>
        <FaRegStar className="text-yellow-500 text-2xl" />
        <p className="text-2xl font-bold">8.5</p>
      </Card>
      
      
      <Card className="w-full p-4">
        <h3 className="text-lg mb-2">Result</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="2019" fill="#ff9f43" />
            <Bar dataKey="2020" fill="#005eff" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      
      
      <Card className="flex-1 min-w-[200px] p-4 flex flex-col items-center">
        <h3 className="text-lg">45%</h3>
        <Progress value={45} className="w-3/4 my-2" />
        <p>Lorem Ipsum</p>
      </Card>
    </div>
  );
}