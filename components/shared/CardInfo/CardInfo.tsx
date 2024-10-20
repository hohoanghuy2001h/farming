import { Text, SafeAreaView, StyleSheet, Image } from 'react-native';
interface CardInfoProps {
  label: string;
  value: string;
  type: string;
  warning?: boolean;
  date: string,
}
export const CardInfo: React.FC<CardInfoProps> = ({label, value, type, warning=false, date}) => {
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style= {styles.labelContainer}>
        <SafeAreaView style={{flexDirection: 'row',}}>
          <Text style={[styles.label,warning? styles.warning:null]}>{label}</Text>
          {warning? <Text style={styles.warningIcon}>a</Text> : null}
        </SafeAreaView>
        {/* <SafeAreaView>
          <Text style={styles.smallText}>{date}</Text>
        </SafeAreaView> */}
      </SafeAreaView>
      <Text style={[styles.value, warning? styles.warning:null]}>{value}{type}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 125,
    height: 100,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ddd',
    borderTopWidth: 0,
    backgroundColor: '#fff', 
    shadowColor: '#000',   
    shadowOffset: {
      width: 0,           
      height: 4,            
    },
    shadowOpacity: 0.2,      
    shadowRadius: 5,        
    elevation: 5, 
  },
  labelContainer: {
    flexDirection: 'column',
  },
  warningIcon: {
    marginLeft: 10,
  },
  label: {
    fontSize: 14,
  },
  value: {
    fontSize: 30,
    fontWeight: 500,
  },
  warning: {
    color: 'red',
  },
  smallText: {
    color: '#B9b9b9',
    fontSize: 12,
  }
});
