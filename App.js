import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [time, setTime] = useState("00:00:00");
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    
    if (isRunning) {
      startTimeRef.current = Date.now();
      intervalRef.current = setInterval(updateTime, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const updateTime = () => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTimeRef.current;
    const formattedTime = formatTime(elapsedTime);
    setTime(formattedTime);
  };

  const handleStart = () => {
    console.log('start watch',Date.now()/1000)
    setIsRunning(true);
  };

  const handleStop = () => {
    console.log('stop watch')
    setIsRunning(false);
    clearInterval(intervalRef.current)
  };

  const handleReset = () => {
    console.log('reset watch now')
    setTime("00:00:00");
    setIsRunning(false);
    clearInterval(intervalRef.current)

  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${padNumber(minutes)}:${padNumber(seconds)}:${padNumber(milliseconds)}`;
  };

  const padNumber = (number) => {
    return number.toString().padStart(2, '0');
  };

  return (
    <View style={styles.container}>
      <View style={styles.timer}>
        <Text style={styles.time}>{time}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleStop}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    width: 200,
    height: 100,
    borderRadius: 10,
    backgroundColor: 'gray',
  },
  time: {
    fontSize: 36,
    textAlign: 'center',
    color: '#ffffff',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    gap:2
  },
  button: {
    width: 100,
    height: 40,
    borderRadius: 10,
    backgroundColor: "black",
    

  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },
})
