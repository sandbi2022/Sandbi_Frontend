# 🕘 Meeting notes

# Mar 27,2022

****
## Attendees

RuiPeng Sun  
Jingquan Chen  
Zihao Lu  
Ranyun Dai  


## Agenda
- Check Progress:
   - Done:
      - Coin info added on both main page and Market Page
      - CSS of Exchange page
      - Backend API
- Discuss choice of kline graph
- Discuss data flow between component  
   
## Discussion
- Choice of kline graph
   - `Echart`
   - `KLineChart`  
Choose `KLineChart` : fits our data representation
- Data flow between component   
   - Redux 
      - import  `@reduxjs/toolkit`
 
## Action items
[ ]  Continue on modifing the CSS style of C2C page and Wallet page  
 @Zihao Lu   
 Due:4/3

[ ] import Redux and implement Kline  
Fetch data of Wallet page  
@Ranyun Dai  
Due:4/3

[ ] Processing data of marketbook and orderbook  
@Jingquan Chen   
Due:4/3

[ ] Test exchange sell and buy function  
Write Api of corresponding page   
@ Ruipeng Sun   
Due: 4/3