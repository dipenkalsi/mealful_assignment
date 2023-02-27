import { useState } from 'react'
import './App.css'
import { Line } from 'react-chartjs-2';
import sampleData from './data';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
console.log(sampleData.length)
function App() {
  const [date , setDate] = useState()
  const [date2 , setDate2] = useState()
  const scheduleDate = [];
  const scheduleTime = ["12PM to 3AM","3AM to 6AM","6AM to 9AM","9AM to 12AM","12AM to 3PM","3PM to 6PM","6PM to 9PM","9AM to 12PM"];
  const numbers = [];
  const numbers2= [0,0,0,0,0,0,0,0];

  let arr = sampleData.filter((item)=>{
    return item.item_date === date;
  })

  console.log(arr)
  for(let i=0;i<arr.length;i++) {
    if(scheduleDate.includes(arr[i].schedule_time.slice(0,10))){
      numbers[scheduleDate.indexOf(arr[i].schedule_time.slice(0,10))]++;
    }
    else{
      scheduleDate.push(arr[i].schedule_time.slice(0,10));
      numbers.push(1);
    }
  }

  let filtered = arr.filter((item)=>{
    return item.schedule_time.slice(0,10) === date2
  })

  for(let i=0;i<filtered.length;i++){
    if(arr[i].schedule_time.slice(11)>="00:00:00" && arr[i].schedule_time.slice(11)<"03:00:00"){
      numbers2[0]++;
    }
    if(arr[i].schedule_time.slice(11)>="03:00:00" && arr[i].schedule_time.slice(11)<"06:00:00"){
      numbers2[1]++;
    }
    if(arr[i].schedule_time.slice(11)>="06:00:00" && arr[i].schedule_time.slice(11)<"09:00:00"){
      numbers2[2]++;
    }
    if(arr[i].schedule_time.slice(11)>="09:00:00" && arr[i].schedule_time.slice(11)<"12:00:00"){
      numbers2[3]++;
    }
    if(arr[i].schedule_time.slice(11)>="12:00:00" && arr[i].schedule_time.slice(11)<"15:00:00"){
      numbers2[4]++;
    }
    if(arr[i].schedule_time.slice(11)>="15:00:00" && arr[i].schedule_time.slice(11)<"18:00:00"){
      numbers2[5]++;
    }
    if(arr[i].schedule_time.slice(11)>="18:00:00" && arr[i].schedule_time.slice(11)<"21:00:00"){
      numbers2[6]++;
    }
    if(arr[i].schedule_time.slice(11)>="21:00:00" && arr[i].schedule_time.slice(11)<="24:00:00"){
      numbers2[7]++;
    }
  }

  console.log(scheduleDate,numbers,scheduleTime)

  const data = {
    labels: scheduleDate,
    datasets: [
      {
        label: 'Number of orders scheduled',
        data: numbers,
        fill: true,
        backgroundColor: 'green',
        borderColor: 'green',
        color:'blue'
      },
    ],
  };

  const options = {
    scales: {
      y: 
        {
          ticks: {
            beginAtZero: true,
          },
          display:true,
          gridColor:"white",
          gridLines: {
            color:"white",
            lineWidth:0.5
          },
        },
    },
  };


  const data2 = {
    labels: scheduleTime,
    datasets: [
      {
        label: 'Number of orders scheduled',
        data: numbers2,
        fill: true,
        backgroundColor: 'green',
        borderColor: 'green',
        color:'blue'
      },
    ],
  };

  const options2 = {
    scales: {
      y: 
        {
          ticks: {
            beginAtZero: true,
          },
          display:true,
          gridColor:"white",
          gridLines: {
            color:"white",
            lineWidth:0.5
          },
        },
    },
  };


  return (
    <div className="bg-gray-50 h-full w-full min-h-screen">
      <h1 className='text-purple-800 w-full text-center text-3xl pt-8'>Dipen Kalsi's Mealful assignment</h1>
      <h2 className='text-purple-500 w-full text-center text-2xl pt-3'>Enter item_date</h2>
      <div className='flex items-center justify-center mt-3'>
          
      <div className="flex items-center justify-center">
        <input type="date" className='px-5 py-2 text-purple-500 bg-gray-100 focus:outline-none border border-purple-500 rounded' onChange={(e)=>{setDate(e.target.value)}}/>
      </div>

      </div>
        
        {scheduleDate.length>0 && numbers.length>0 && <div className='flex items-center justify-center py-8 max-w-3xl md:ml-64'>
        {scheduleDate.length>0 && numbers.length>0 && <Line data={data} options={options} className=" h-auto" />}
        </div>}


      {scheduleDate.length>0 &&
        (
          <>
        <h2 className='text-purple-500 w-full text-center text-2xl pt-3'>Enter schedule date to see all orders on that particular day</h2>
      <div className='flex items-center justify-center mt-3'>
          
      <div className="flex items-center justify-center">
        <input type="date" className='px-5 py-2 text-purple-500 mb-4 bg-gray-100 focus:outline-none border border-purple-500 rounded' onChange={(e)=>{setDate2(e.target.value)}}/>
      </div>

      </div>
      </>
      )
      }
        {date2 && (numbers2[0]>0||numbers2[1]>0||numbers2[2]>0||numbers2[3]) && <div className='flex items-center justify-center py-8 max-w-3xl md:ml-64'>
        {scheduleDate.length>0 && numbers.length>0 && <Line data={data2} options={options2} className=" h-auto" />}
        </div>}
        
        {(scheduleDate.length<=0 || numbers.length<=0) &&
        <div className='text-2xl text-gray-600 font-thin text-center mt-9'>
          There are no orders scheduled for this date.
        </div>  
        }


    </div>
  )
}

export default App
