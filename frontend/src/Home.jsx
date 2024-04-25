import React from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';

function Home() {

    const data = [
        {
          name: 'June',
          sale: 400,
          quantity: 600,
          amt: 24000,
        },
        {
          name: 'July',
          sale: 300,
          quantity: 400,
          amt: 20000,
        },
        {
          name: 'August',
          sale: 200,
          quantity: 300,
          amt: 10000,
        },
        {
          name: 'September',
          sale: 270,
          quantity: 700,
          amt: 9000,
        },
        {
          name: 'October',
          sale: 500,
          quantity: 700,
          amt: 2181,
        },
        {
          name: 'November',
          sale: 350,
          quantity: 500,
          amt: 7750,
        },
        {
          name: 'December',
          sale: 440,
          quantity: 700,
          amt: 21000,
        },
      ];
     

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>SALE</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1>30000</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>PRODUCT</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1>13</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>CUSTOMERS</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>33</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>ALERTS</h3>
                    <BsFillBellFill className='card_icon'/>
                </div>
                <h1>02</h1>
            </div>
        </div>

        <div className='charts'>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantity" fill="#8884d8" />
                <Bar dataKey="sale" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={200}
                height={200}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="quantity" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="sale" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

        </div>
    </main>
  )
}

export default Home