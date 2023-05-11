const calculate = () => {
    let total = document.querySelector("#total").value;
    let airCond = document.querySelector("#airConditioner").value;
    let tax = document.querySelector("#tax").value;
    let normalUse = total - airCond;

    // let levelElectricFee = [1.678,1.735,2.015,2.536,2.834,2.927];
    let levelElectricFee = [1.728, 1.786, 2.074, 2.612, 2.919, 3.015];
    // let tax = 0.1;
    let eUsage = [0,0,0,0,0,0];
    let eAirCond = [0,0,0,0,0,0];
    tax = parseFloat(tax);
    let levelAirCond = 0;
    for(let i = 0; i < levelElectricFee.length; i++){
        let max;
        if(i <= 1) max = 50;
        else if(i <= 4) max = 100;
        else max = 9999;

        if(normalUse > max){
            eUsage[i] = max;
            normalUse -= eUsage[i];
        }else{
            eUsage[i] = normalUse;
            normalUse = 0;
            levelAirCond = i;
            break;
        }
    }
    for(let i = levelAirCond; i < 6; i++){
        let max;
        if(i <= 1) max = 50;
        else if(i <= 4) max = 100;
        else max = 9999;

        if(i === 5){
            eAirCond[i] = airCond;
            break;
        }
        if(airCond > max){
            eAirCond[i] = max - eUsage[i];
            airCond -= eAirCond[i];
        }else{
            eAirCond[i] = airCond;
            airCond = 0;
            levelAirCond = i;
            break;
        }
    }

    let normalFee = 0;
    let airCondFee = 0;
    for(let i = 0; i < 6; i++){
        normalFee += eUsage[i] * levelElectricFee[i];
        airCondFee += eAirCond[i] * levelElectricFee[i];
    }


    let normalCost = parseFloat(normalFee*(1 + tax));
    let airCondCost = parseFloat(airCondFee*(1 + tax));
    
    document.querySelector("#showdata").innerHTML = `Tiền điện không máy lạnh ${normalCost} (nghìn đồng)`;
    document.querySelector("#showdata").innerHTML += `<br>Tiền điện máy lạnh ${airCondCost} (nghìn đồng)`;
    document.querySelector("#showdata").innerHTML += `<br>Tổng tính được, nên kiểm tra với hoá đơn ${airCondCost + normalCost} (nghìn đồng)`;
    document.querySelector("#showdata").innerHTML += `<br>-----------------------------------------------------------`;
    
    document.querySelector("#showdata").innerHTML += `<br>------Bảng kWh điện theo từng mức-------------------------`;
    document.querySelector("#showdata").innerHTML += `<br>Mức ------ kWh điện không máy lạnh ----- kWh điện máy lạnh ----- Đơn giá`;
    
    for(let i = 0; i < 6; i++){
        document.querySelector("#showdata").innerHTML += `<br>level ${i+1}: ${eUsage[i]} kWh   '${eAirCond[i]} kWh   ${levelElectricFee[i]}đ`;
    }
    
}
