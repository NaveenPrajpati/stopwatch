import React, { useState, useEffect,useRef } from 'react';
import { StyleSheet, Text, Button, View, Pressable, TouchableOpacity } from 'react-native';

const Stopwatch = () => {
  const [time, setTime] = useState('00:00:00');
  const [isRunning, setIsRunning] = useState(false);

  const initialTime=useRef(null)
  const lapsTime=useRef(null)

  useEffect(() => {
    if(lapsTime.current==0)
    initialTime.current=Date.now()
    else{
      initialTime.current=(Date.now()-lapsTime.current)+initialTime.current
      lapsTime.current=0
    }

    if (isRunning) {


      const interval = setInterval(() => {
        const currentTime =Date.now();
        const elapsedTime=(currentTime-initialTime.current)
        const seconds = Math.floor((elapsedTime % 60000)/1000);
        const minutes = Math.floor(elapsedTime / (1000*60));
        const milliseconds =Math.floor((elapsedTime%1000)/10) ;

        setTime(`${minutes<=9?'0'+minutes:minutes}:${seconds<=9?'0'+seconds:seconds}:${milliseconds.toString().padStart(2, '0')}`);
      }, 10);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isRunning]);

  const start = () => {
    setIsRunning(true);
  };

  const stop = () => {
    
   lapsTime.current=Date.now()

   console.log(lapsTime.current)
    setIsRunning(false);
  };
const reset = () => {
    setIsRunning(false);
    setTime('00:00:00')
    lapsTime.current==0
  };  

  return (
    <View className='flex justify-center items-center h-screen'>
      
      <Text style={styles.time}>{time}</Text>

      <View className='flex-row  gap-2 p-2 '>
      <TouchableOpacity
       className='bg-gray-200 px-3 '
        onPress={start}
        disabled={isRunning}><Text>start</Text></TouchableOpacity>
    
    <View className='bg-gray-200 px-3'>

      <Button
        title="Stop"
        color={'red'}
        onPress={stop}
        disabled={!isRunning}
      />
    </View>
    <View>

        <Button
        title="reset"
        onPress={reset}
        disabled={!isRunning}
      />
    </View>
      </View>
      <View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontSize: 40,
  },
});

export default Stopwatch;