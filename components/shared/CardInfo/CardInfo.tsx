import { Text, SafeAreaView, StyleSheet, Image } from 'react-native';
interface CardInfoProps {
  label: string;
  value: string;
  type: string;
  warning?: boolean;
}
export const CardInfo: React.FC<CardInfoProps> = ({label, value, type, warning=false}) => {
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style= {styles.labelContainer}>
        <Text style={[styles.label,warning? styles.warning:null]}>{label}</Text>
        {warning? <Text style={styles.warningIcon}>a</Text> : null}
      </SafeAreaView>
      <Text style={[styles.value, warning? styles.warning:null]}>{value}{type}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    display: 'flex',
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
    shadowOpacity: 0.25,      
    shadowRadius: 4,        
    elevation: 5,           
  },
  labelContainer: {
    flexDirection: 'row',
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
});
