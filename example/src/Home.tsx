import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useToast } from 'rn-snap-toast';
let count = 0;
const Home = () => {
  const { showToast } = useToast();
  return (
    <View style={style.container}>
      <Pressable
        style={style?.button}
        onPress={() => showToast({ message: 'Hello' + count++ })}
      >
        <Text style={{ color: '#fff' }}>Show Toast</Text>
      </Pressable>
    </View>
  );
};

export default Home;
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007aff',
    width: '100%',
  },
  button: {
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 10,
  },
});
