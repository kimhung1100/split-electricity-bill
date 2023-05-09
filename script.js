const calculate = () => {
    let total = document.querySelector("#total").value;
    let airCond = document.querySelector("#airConditioner").value;
    let normalUse = total - airCond;

    let levelElectricFee = [1.678,1.735,2.015,2.536,2.834,2.927];
    let eUsage = [0,0,0,0,0,0];
    let eAirCond = [0,0,0,0,0,0];

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


    let normalCost = parseFloat(normalFee*1.08);
    let airCondCost = parseFloat(airCondFee*1.08);
    document.querySelector("#showdata").innerHTML = `Tiền điện không máy lạnh ${normalCost}(nghìn đồng)`;
    document.querySelector("#showdata").innerHTML += `<br>Tiền điện máy lạnh ${airCondCost}(nghìn đồng)`;
    document.querySelector("#showdata").innerHTML += `<br>------------------------------------------------`;
    document.querySelector("#showdata").innerHTML += `<br>------Bảng kWh điện theo từng mức-------------------------`;
    document.querySelector("#showdata").innerHTML += `Mức ------ kWh điện không máy lạnh ----- kWh điện máy lạnh ----- Đơn giá`;
    document.querySelector("#showdata").innerHTML += `<br>------------------------------------------------`;
    for(let i = 0; i < 6; i++){
        document.querySelector("#showdata").innerHTML += `<br>level ${i+1}: ${eUsage[i]} kWh   '${eAirCond[i]} kWh   ${levelElectricFee[i]}đ`;
    }
}
