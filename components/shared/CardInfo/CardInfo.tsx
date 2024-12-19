import { Text, View, StyleSheet, Image } from 'react-native';
interface CardInfoProps {
  label: string;
  value: string;
  type: string;
  warning?: number;
  date: Date,
}
export const CardInfo: React.FC<CardInfoProps> = ({label, value, type, warning=0, date}) => {
  return (
    <View style={styles.container}>
      <View style= {styles.labelContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[styles.label,warning? styles.warning:null]}>{label}</Text>
          {warning? <Image style={styles.warningIcon} source={require('@/assets/icons/alertIcon.png')}></Image> : null}
        </View>
      </View>
      <Text style={[styles.value, warning? styles.warning:null]}>{value}{type}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 125,
    aspectRatio: 5/4,
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
    marginLeft: 5,
    width: 15,
    height: 15,
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
