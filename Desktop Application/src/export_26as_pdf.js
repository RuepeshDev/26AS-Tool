function export26ASPdf(){
	var partABody = [],rowA = new Array(),subRowA = new Array();
	var colAGrid = new Array(), colASubGrid = new Array(),subGridAData;
	var fileName;
		
	var partA1Body = [],rowA1 = new Array(),subRowA1 = new Array();
	var colA1Grid = new Array(), colA1SubGrid = new Array(),subGridA1Data;
	
	var partA2Body = [],rowA2 = new Array(),subRowA2 = new Array();
	var colA2Grid = new Array(), colA2SubGrid = new Array(),subGridA2Data;
	
	var partA3Body = [],rowA3 = new Array(),subRowA3 = new Array();
	var colA3Grid = new Array(), colA3SubGrid = new Array(),subGridA3Data;
	
	var sumGridA2 = new Array(),sumColdA2 = new Array();
	
	var partBBody = [],rowB = new Array(),subRowB = new Array();
	var colBGrid = new Array(), colBSubGrid = new Array(),subGridBData;
	
	var sumGridB = new Array(),sumColdB = new Array();
	
	var partCBody = [],rowC = new Array(),subRowC = new Array();
	var colCGrid = new Array(), colCSubGrid = new Array(),subGridCData;
	
	var partDBody = [],rowD = new Array(),subRowD = new Array();
	var colDGrid = new Array(), colDSubGrid = new Array(),subGridDData;
	
	var partEBody = [],rowE = new Array(),subRowE = new Array();
	var colEGrid = new Array(), colESubGrid = new Array(),subGridEData;
	
	var partFBody = [],rowF = new Array(),subRowF = new Array();
	var colFGrid = new Array(), colFSubGrid = new Array(),subGridFData;
	
	var sumGridF = new Array(),sumColdF = new Array();
	
	var partGBody = [],rowG = new Array(),subRowG = new Array();
	var colGGrid = new Array(), colGSubGrid = new Array(),subGridGData;
	
	var partHBody = [],rowH = new Array(),subRowH = new Array();
	var colHGrid = new Array(), colHSubGrid = new Array(),subGridHData;
	
	var sumGridG = new Array(),sumColdG = new Array();
	
	//CR743 changes start
	var partA5Body = [],rowA5 = new Array(),subRowA5 = new Array();
	var colA5Grid = new Array(), colA5SubGrid = new Array(),subGridA5Data;
	var sumGridA5 = new Array(),sumColdA5 = new Array();
	var partA9Body = [],rowA9 = new Array(),subRowA9 = new Array();
	var colA9Grid = new Array(), colA9SubGrid = new Array(),subGridA9Data;
	var sumGridA9 = new Array(),sumColdA9 = new Array();
	//CR743 chnages end
		
	var ContactInfoBody = [],ContactInfoRow = new Array();
	
	var legendsBody = [],legendsRow = new Array();
	
	var legendsDescBody = [],legendsDescRow = new Array();
	
	var typeOfTransBody = [],typeOfTransRow = new Array();
		
	var sections1Body = [],sections1Row = new Array();
	
	var sections2Body = [],sections2Row = new Array();
	
	var minorHeadBody = [],minorHeadRow = new Array();
	
	var majorHeadBody = [],majorHeadRow = new Array();
	
	var glossary1Body = [],glossary1Row = new Array();
	
	var glossary2Body = [],glossary2Row = new Array();
	
	//var partGlossBody = [];
	/*****************************Part A : Start*************************************************/ 
	if (pdfData.partabtxt.detA.length == 0){
		//Main Table Headers
		colAGrid = new Array();
		colAGrid.push({text: bundle_lbl_srNo, style:'tableHeader'});
    	colAGrid.push({text: lbl_namDed, style:'tableHeader',colSpan: 4});
    	colAGrid.push('');
    	colAGrid.push('');
    	colAGrid.push('');
    	colAGrid.push({text: lbl_tanDed, style: 'tableHeader'});
    	colAGrid.push({text: 'Total Amount Paid/Credited',style:'tableHeader'});
		colAGrid.push({columns : [{text: 'Total Tax Deducted',width:'auto'},{text:'#',fontSize:5,width:5}], style:'tableHeader'});
    	colAGrid.push({text: 'Total TDS\nDeposited',style:'tableHeader'});
		partABody.push(colAGrid);
		
		//Main Table Data
		rowA = new Array();
	    rowA.push({text :" ",height:20});
	    rowA.push({text :'',colSpan: 4,height:20});
	    rowA.push({text :" ",height:20});
	    rowA.push({text :" ",height:20});
	    rowA.push({text :" ",height:20});
	    rowA.push({text :" ",height:20});
	    rowA.push({text :" ",height:20});
	    rowA.push({text :" ",height:20});
	    rowA.push({text :" ",height:20});
	    partABody.push(rowA);
	    
	    //Sub Grid Headers
	    colASubGrid = new Array();
	    colASubGrid.push({text: bundle_lbl_srNo, style:'subtableHeader'});
    	colASubGrid.push({columns : [{text: 'Section',width:'auto'},{text:'1',fontSize:5,width:5}], style:'subtableHeader'});
    	colASubGrid.push({text: 'Transaction Date',style:'subtableHeader'});
	    colASubGrid.push({text: 'Status of Booking*',style:'subtableHeader'});
	    colASubGrid.push({text: 'Date of Booking',style:'subtableHeader'});
	   	colASubGrid.push({text: 'Remarks**',style:'subtableHeader'});
	    colASubGrid.push({text: 'Amount Paid / Credited',style:'subtableHeader'});
	    colASubGrid.push({columns : [{text: 'Tax Deducted',width:'auto'},{text:'##',fontSize:5,width:10}],style:'subtableHeader'});
    	colASubGrid.push({text: 'TDS Deposited',style:'subtableHeader'});
	    partABody.push(colASubGrid);
	 }else{
		pdfData.partabtxt.detA.forEach(function(partA){
			//Main Table Headers
			colAGrid = new Array();
			colAGrid.push({text: bundle_lbl_srNo, style:'tableHeader'});
	    	colAGrid.push({text: lbl_namDed, style:'tableHeader',colSpan: 4});
	    	colAGrid.push('');
	    	colAGrid.push('');
	    	colAGrid.push('');
	    	colAGrid.push({text: lbl_tanDed, style: 'tableHeader'});
	    	colAGrid.push({text: 'Total Amount Paid/Credited',style:'tableHeader'});
	   		colAGrid.push({columns : [{text: 'Total Tax Deducted',width:'auto'},{text:'#',fontSize:5,width:5}], style:'tableHeader'});
	    	colAGrid.push({text: 'Total TDS\nDeposited',style:'tableHeader'});
			partABody.push(colAGrid);
			
			//Main Table Data
			rowA = new Array();
		    rowA.push({text:partA['1A'],style :'dataFieldStyle'});
		    rowA.push({text:partA['3A'],colSpan: 4,style :'dataFieldStyle'});
		    rowA.push("");
		    rowA.push("");
		    rowA.push("");
		    rowA.push({text:partA['TA'],style :'dataFieldStyle'});
		    rowA.push({text:parseFloat(partA['5A']).toFixed(2),style :'amtFieldStyle'});
		    rowA.push({text:parseFloat(partA['6A']).toFixed(2),style :'amtFieldStyle'});
		    rowA.push({text:parseFloat(partA['7A']).toFixed(2),style :'amtFieldStyle'});
		    partABody.push(rowA);
		    
		    //Sub Grid Headers
		    colASubGrid = new Array();
		    colASubGrid.push({text: bundle_lbl_srNo, style:'subtableHeader'});
	    	colASubGrid.push({columns : [{text: 'Section',width:'auto'},{text:'1',fontSize:5,width:5}], style:'subtableHeader'});
	    	colASubGrid.push({text: 'Transaction Date',style:'subtableHeader'});
	    	colASubGrid.push({text: 'Status of Booking*',style:'subtableHeader'});
	    	colASubGrid.push({text: 'Date of Booking',style:'subtableHeader'});
	   		colASubGrid.push({text: 'Remarks**',style:'subtableHeader'});
	    	colASubGrid.push({text: 'Amount Paid / Credited',style:'subtableHeader'});
	    	colASubGrid.push({columns : [{text: 'Tax Deducted',width:'auto'},{text:'##',fontSize:5,width:10}],style:'subtableHeader'});
	    	colASubGrid.push({text: 'TDS Deposited',style:'subtableHeader'});
		    partABody.push(colASubGrid);
		    
		    //Sub Grid Data
		    subGridAData = eval('pdfData.partabtxt.tanA' + partA['TA']);
		    
		    subGridAData.forEach(function(subA){
		    	subRowA = new Array();
			    subRowA.push({text:subA['A1'],style :'dataFieldStyle'});
			    subRowA.push({text:subA['A2'],style :'dataFieldStyle'});
			    subRowA.push({text:subA['A3'],style :'dataFieldStyle'});
			    if(subA['A4']=='F'){
			    	subRowA.push({text:subA['A4'],color:'#009933',style :'dataFieldStyle'});
			    }else{
			    	subRowA.push({text:subA['A4'],color:'#CC0000',style :'dataFieldStyle'});
			    }
			    subRowA.push({text:subA['A5'],style :'dataFieldStyle'});
			    subRowA.push({text:subA['A6'],style :'dataFieldStyle'});
			    subRowA.push({text:parseFloat(subA['A7']).toFixed(2),style :'amtFieldStyle'});
			    subRowA.push({text:parseFloat(subA['A8']).toFixed(2),style :'amtFieldStyle'});
			    subRowA.push({text:parseFloat(subA['A9']).toFixed(2),style :'amtFieldStyle'});
			    partABody.push(subRowA);
		    });
		});
	}
   	/*****************************Part A : End*************************************************/ 
   	
   	/******************************Part A1 : Starts****************/
    	if (pdfData.partabtxt.detA1.length == 0){
		//Main Table Headers
		colA1Grid = new Array();
		colA1Grid.push({text: bundle_lbl_srNo, style:'tableHeader'});
    	colA1Grid.push({text: lbl_namDed, style:'tableHeader',colSpan: 3});
    	colA1Grid.push('');
    	colA1Grid.push('');
    	colA1Grid.push({text: lbl_tanDed, style: 'tableHeader'});
    	colA1Grid.push({text: 'Total Amount Paid / Credited',style:'tableHeader'});
    	colA1Grid.push({columns : [{text: 'Total Tax Deducted',width:'auto'},{text:'#',fontSize:5,width:5}],style:'tableHeader'});
    	colA1Grid.push({text: 'Total TDS Deposited',style:'tableHeader'});
		partA1Body.push(colA1Grid);
		
		//Main Table Data
		rowA1 = new Array();
	    rowA1.push({text :" ",height:20});
	    rowA1.push({text :'',colSpan: 3,height:20});
	    rowA1.push({text :" ",height:20});
	    rowA1.push({text :" ",height:20});
	    rowA1.push({text :" ",height:20});
	    rowA1.push({text :" ",height:20});
	    rowA1.push({text :" ",height:20});
	    rowA1.push({text :" ",height:20});
	    partA1Body.push(rowA1);
	    
	    //Sub Grid Headers
	    colA1SubGrid = new Array();
	    colA1SubGrid.push({text: bundle_lbl_srNo, style:'subtableHeader'});
    	colA1SubGrid.push({columns : [{text: 'Section',width:'auto'},{text:'1',fontSize:5,width:5}], style:'subtableHeader'});
    	colA1SubGrid.push({text: 'Transaction Date',style:'subtableHeader'});
    	colA1SubGrid.push({text: 'Date of Booking',style:'subtableHeader'});
   	 	colA1SubGrid.push({text: 'Remarks**',style:'subtableHeader'});
    	colA1SubGrid.push({text: 'Amount Paid/Credited',style:'subtableHeader'});
    	colA1SubGrid.push({columns : [{text: 'Tax Deducted',width:'auto'},{text:'##',fontSize:5,width:10}],style:'subtableHeader'});
    	colA1SubGrid.push({text: 'TDS Deposited',style:'subtableHeader'});
	    partA1Body.push(colA1SubGrid);
	 }else{
	 	pdfData.partabtxt.detA1.forEach(function(partA1){
		//Main Table Headers
		colA1Grid = new Array();
		colA1Grid.push({text: bundle_lbl_srNo, style:'tableHeader'});
    	colA1Grid.push({text: lbl_namDed, style:'tableHeader',colSpan: 3});
    	colA1Grid.push('');
    	colA1Grid.push('');
    	colA1Grid.push({text: lbl_tanDed, style: 'tableHeader'});
    	colA1Grid.push({text: 'Total Amount Paid/Credited',style:'tableHeader'});
    	colA1Grid.push({columns : [{text: 'Total Tax Deducted',width:'auto'},{text:'#',fontSize:5,width:5}],style:'tableHeader'});
    	colA1Grid.push({text: 'Total TDS Deposited',style:'tableHeader'});
		partA1Body.push(colA1Grid);
		
		//Main Table Data
		rowA1 = new Array();
	    rowA1.push({text:partA1['1A1'],style :'dataFieldStyle'});
	    rowA1.push({text:partA1['2A1'],colSpan: 3,style :'dataFieldStyle'});
	    rowA1.push("");
	    rowA1.push("");
	    rowA1.push({text:partA1['TA1'],style :'dataFieldStyle'});
	    rowA1.push({text:parseFloat(partA1['4A1']).toFixed(2),style :'amtFieldStyle'});
	    rowA1.push({text:parseFloat(partA1['5A1']).toFixed(2),style :'amtFieldStyle'});
	    rowA1.push({text:parseFloat(partA1['6A1']).toFixed(2),style :'amtFieldStyle'});
	    partA1Body.push(rowA1);
	    
	    //Sub Grid Headers
	    colA1SubGrid = new Array();
	    colA1SubGrid.push({text: bundle_lbl_srNo, style:'subtableHeader'});
    	colA1SubGrid.push({columns : [{text: 'Section',width:'auto'},{text:'1',fontSize:5,width:5}], style:'subtableHeader'});
    	colA1SubGrid.push({text: 'Transaction Date',style:'subtableHeader'});
    	colA1SubGrid.push({text: 'Date of Booking',style:'subtableHeader'});
   	 	colA1SubGrid.push({text: 'Remarks**',style:'subtableHeader'});
    	colA1SubGrid.push({text: 'Amount Paid/Credited',style:'subtableHeader'});
    	colA1SubGrid.push({columns : [{text: 'Tax Deducted',width:'auto'},{text:'##',fontSize:5,width:10}],style:'subtableHeader'});
    	colA1SubGrid.push({text: 'TDS Deposited',style:'subtableHeader'});
	    partA1Body.push(colA1SubGrid);
	    
	     //Sub Grid Data
	    subGridA1Data = eval('pdfData.partabtxt.tanA1' + partA1['TA1']);
	    
	     subGridA1Data.forEach(function(subA1){
	    	subRowA1 = new Array();
		    subRowA1.push({text:subA1['A11'],style :'dataFieldStyle'});
		    subRowA1.push({text:subA1['A12'],style :'dataFieldStyle'});
		    subRowA1.push({text:subA1['A13'],style :'dataFieldStyle'});
		    subRowA1.push({text:subA1['A14'],style :'dataFieldStyle'});
		    subRowA1.push({text:subA1['A15'],style :'dataFieldStyle'});
		    subRowA1.push({text:parseFloat(subA1['A16']).toFixed(2),style :'amtFieldStyle'});
		    subRowA1.push({text:parseFloat(subA1['A17']).toFixed(2),style :'amtFieldStyle'});
		    subRowA1.push({text:parseFloat(subA1['A18']).toFixed(2),style :'amtFieldStyle'});
		    partA1Body.push(subRowA1);
	    }); 
	});	
	}
	/**********************Part A1 : Ends****************/
	/**********************Part A2 : Starts****************/
	if (pdfData.partA2txt.detA2.length == 0){
		//Main Table Headers
		colA2Grid = new Array();
		colA2Grid.push({text: bundle_lbl_srNo, style:'tableHeader'});
		colA2Grid.push({text: 'Acknowledgement Number', style:'tableHeader'});
		if(assYrSelVal>='2023'){
			colA2Grid.push({text: lbl_namDed, style:'tableHeader',colSpan: 2});
			colA2Grid.push({text:''});
		}else
			colA2Grid.push({text: lbl_namDed, style:'tableHeader'});
		colA2Grid.push({text: 'PAN of  Deductor', style: 'tableHeader'});
    	colA2Grid.push({text: 'Transaction Date',style:'tableHeader'});
    	colA2Grid.push({text: 'Total Transaction Amount',style:'tableHeader'});
    	colA2Grid.push({text: 'Total TDS Deposited***',style:'tableHeader'});
		partA2Body.push(colA2Grid);
		
		//Main Table Data
		rowA2 = new Array();
	    rowA2.push({text:" ",height:20});
		rowA2.push({text:" ",height:20});
		if(assYrSelVal>='2023'){
			 rowA2.push({text:" ",height:20,colSpan: 2});
			 rowA2.push({text:" ",height:20});
		}else
			rowA2.push({text:" ",height:20});
	    rowA2.push({text:" ",height:20});
	    rowA2.push({text:" ",height:20});
	    rowA2.push({text:" ",height:20});
		rowA2.push({text:" ",height:20});
		partA2Body.push(rowA2);
	    
	    //Sub Grid Headers
	    colA2SubGrid = new Array();
	    colA2SubGrid.push({text: bundle_lbl_srNo, style:'subtableHeader'});
    	colA2SubGrid.push({text: 'TDS Certificate Number', style:'subtableHeader'});
		if(assYrSelVal>='2023'){
			colA2SubGrid.push({columns : [{text: 'Section',width:'auto'},{text:'1',fontSize:5,width:5}], style:'subtableHeader'});
		}
		colA2SubGrid.push({text: 'Date of Deposit',style:'subtableHeader'});
    	colA2SubGrid.push({text: 'Status of Booking*',style:'subtableHeader'});
   	 	colA2SubGrid.push({text: 'Date of Booking', style:'subtableHeader'});
    	colA2SubGrid.push({text: 'Demand Payment',style:'subtableHeader'});
    	colA2SubGrid.push({text: 'TDS Deposited***',style:'subtableHeader'});
	    partA2Body.push(colA2SubGrid);
	    
	    sumColdA2 = new Array();
		if(assYrSelVal>='2023'){
			sumColdA2.push({text: 'Gross Total Across Deductor(s)', style:'tableHeader',colSpan: 6})
			sumColdA2.push("");
		}else
			sumColdA2.push({text: 'Gross Total Across Deductor(s)', style:'tableHeader',colSpan: 5})
		sumColdA2.push("");
	    sumColdA2.push("");
	    sumColdA2.push("");
	    sumColdA2.push("");
	    sumColdA2.push({text:" ", height:20,style:'amtFieldHeader'});
	    sumColdA2.push({text:" ", height:20,style:'amtFieldHeader'});
	    partA2Body.push(sumColdA2);   
	 }else{
 	 	pdfData.partA2txt.detA2.forEach(function(partA2){
		//Main Table Headers
		colA2Grid = new Array();
		colA2Grid.push({text: bundle_lbl_srNo, style:'tableHeader'});
		colA2Grid.push({text: 'Acknowledgement Number', style:'tableHeader'});
		if(assYrSelVal>='2023'){
			colA2Grid.push({text: lbl_namDed, style:'tableHeader',colSpan: 2});
			colA2Grid.push({text:''});
		}else
			colA2Grid.push({text: lbl_namDed, style:'tableHeader'});
		colA2Grid.push({text: 'PAN of  Deductor', style: 'tableHeader'});
    	colA2Grid.push({text: 'Transaction Date',style:'tableHeader'});
    	colA2Grid.push({text: 'Total Transaction Amount',style:'tableHeader'});
    	colA2Grid.push({text: 'Total TDS Deposited***',style:'tableHeader'});
		partA2Body.push(colA2Grid);
		
		//Main Table Data
		
		rowA2 = new Array();
	    rowA2.push({text:partA2['1A2'],style :'dataFieldStyle'});
	    rowA2.push({text:partA2['AA2'],style :'dataFieldStyle'});
		if(assYrSelVal>='2023'){
			 rowA2.push({text:partA2['3A2'],style :'dataFieldStyle',colSpan: 2});
			 rowA2.push({text:" "});
		}else
			rowA2.push({text:partA2['3A2'],style :'dataFieldStyle'});
	    rowA2.push({text:partA2['AA4'],style :'dataFieldStyle'});
	    rowA2.push({text:partA2['5A2'],style :'dataFieldStyle'});
	    rowA2.push({text:parseFloat(partA2['6A2']).toFixed(2),style :'amtFieldStyle'});
	    rowA2.push({text:parseFloat(partA2['7A2']).toFixed(2),style :'amtFieldStyle'});
	    partA2Body.push(rowA2);
	    
	    //Sub Grid Headers
	    colA2SubGrid = new Array();
	    colA2SubGrid.push({text: bundle_lbl_srNo, style:'subtableHeader'});
    	colA2SubGrid.push({text: 'TDS Certificate Number', style:'subtableHeader'});
		if(assYrSelVal>='2023'){
			colA2SubGrid.push({columns : [{text: 'Section',width:'auto'},{text:'1',fontSize:5,width:5}], style:'subtableHeader'});
		}
    	colA2SubGrid.push({text: 'Date of Deposit',style:'subtableHeader'});
		colA2SubGrid.push({text: 'Status of Booking*',style:'subtableHeader'});
   	 	colA2SubGrid.push({text: 'Date of Booking', style:'subtableHeader'});
    	colA2SubGrid.push({text: 'Demand Payment',style:'subtableHeader'});
    	colA2SubGrid.push({text: 'TDS Deposited***',style:'subtableHeader'});
	    partA2Body.push(colA2SubGrid);
	    
	   subGridA2Data = eval('pdfData.partA2txt.ack' + partA2['AA2'] + partA2['AA4']);	    
	    
	   subGridA2Data.forEach(function(subA2){
	    subRowA2 = new Array();
		subRowA2.push({text:subA2['A21'],style :'dataFieldStyle'});
		subRowA2.push({text:subA2['A22'],style :'dataFieldStyle'});
		if(assYrSelVal>='2023'){
			subRowA2.push({text:subA2['A28'],style :'dataFieldStyle'});
		}
		subRowA2.push({text:subA2['A23'],style :'dataFieldStyle'});
		subRowA2.push({text:subA2['A24'],style :'dataFieldStyle'});
		subRowA2.push({text:subA2['A25'],style :'dataFieldStyle'});
		subRowA2.push({text:subA2['A26'],style :'dataFieldStyle'});
		subRowA2.push({text:parseFloat(subA2['A27']).toFixed(2),style :'amtFieldStyle'});
		partA2Body.push(subRowA2);		
	   }); 
	  
	});
	 sumGridA2 = eval('pdfData.partA2sum.split("^")');
	 
	     sumColdA2 = new Array();
	    if(assYrSelVal>='2023'){
			sumColdA2.push({text: 'Gross Total Across Deductor(s)', style:'tableHeader',colSpan: 6})
			sumColdA2.push("");
		}else
			sumColdA2.push({text: 'Gross Total Across Deductor(s)', style:'tableHeader',colSpan: 5})
	    sumColdA2.push("");
		sumColdA2.push("");
	    sumColdA2.push("");
	    sumColdA2.push("");
	    sumColdA2.push({text: sumGridA2[0], style:'amtFieldHeader'});
	    sumColdA2.push({text: sumGridA2[1], style:'amtFieldHeader'});
	    partA2Body.push(sumColdA2);   
	}	 
		/**********************Part A2 : Ends****************/
	
	// CR 709 changes starts 
	/********************** Part III Starts**************/
	if (pdfData.partabtxt.detA3.length == 0 && assYrSelVal>='2023'){
		//Main Table Headers
		colA3Grid = new Array();
		colA3Grid.push({text: bundle_lbl_srNo, style:'tableHeader'});
    	colA3Grid.push({text: lbl_namDed, style:'tableHeader',colSpan: 3});
    	colA3Grid.push('');
    	colA3Grid.push('');
    	colA3Grid.push({text: lbl_tanDed, style: 'tableHeader'});
    	colA3Grid.push({text: 'Total Amount Paid / Credited',style:'tableHeader'});
		partA3Body.push(colA3Grid);
		
		//Main Table Data
		rowA3 = new Array();
	    rowA3.push({text :" ",height:20});
	    rowA3.push({text :'',colSpan: 3,height:20});
	    rowA3.push({text :" ",height:20});
	    rowA3.push({text :" ",height:20});
	    rowA3.push({text :" ",height:20});
	    rowA3.push({text :" ",height:20});
	    partA3Body.push(rowA3);
	    
	    //Sub Grid Headers
	    colA3SubGrid = new Array();
	    colA3SubGrid.push({text: bundle_lbl_srNo, style:'subtableHeader'});
    	colA3SubGrid.push({columns : [{text: 'Section',width:'auto'},{text:'1',fontSize:5,width:5}], style:'subtableHeader'});
    	colA3SubGrid.push({text: 'Transaction Date',style:'subtableHeader'});
    	colA3SubGrid.push({text: 'Status of Booking*',style:'subtableHeader'});
   	 	colA3SubGrid.push({text: 'Remarks**',style:'subtableHeader'});
    	colA3SubGrid.push({text: 'Amount Paid/Credited',style:'subtableHeader'});
	    partA3Body.push(colA3SubGrid);
	 }else if(assYrSelVal>='2023'){
	 	pdfData.partabtxt.detA3.forEach(function(partA3){
		//Main Table Headers
		colA3Grid = new Array();
		colA3Grid.push({text: bundle_lbl_srNo, style:'tableHeader'});
    	colA3Grid.push({text: lbl_namDed, style:'tableHeader',colSpan: 3});
    	colA3Grid.push('');
    	colA3Grid.push('');
    	colA3Grid.push({text: lbl_tanDed, style: 'tableHeader'});
    	colA3Grid.push({text: 'Total Amount Paid/Credited',style:'tableHeader'});
		partA3Body.push(colA3Grid);
		
		//Main Table Data------Dout
		rowA3 = new Array();
	    rowA3.push({text:partA3['1A3'],style :'dataFieldStyle'});
	    rowA3.push({text:partA3['2A3'],colSpan: 3,style :'dataFieldStyle'});
	    rowA3.push("");
	    rowA3.push("");
	    rowA3.push({text:partA3['TA3'],style :'dataFieldStyle'});
	    rowA3.push({text:parseFloat(partA3['4A3']).toFixed(2),style :'amtFieldStyle'});
	    partA3Body.push(rowA3);
	    
	    //Sub Grid Headers
	    colA3SubGrid = new Array();
	    colA3SubGrid.push({text: bundle_lbl_srNo, style:'subtableHeader'});
    	colA3SubGrid.push({columns : [{text: 'Section',width:'auto'},{text:'1',fontSize:5,width:5}], style:'subtableHeader'});
    	colA3SubGrid.push({text: 'Transaction Date',style:'subtableHeader'});
    	colA3SubGrid.push({text: 'Status of Booking*',style:'subtableHeader'});
   	 	colA3SubGrid.push({text: 'Remarks**',style:'subtableHeader'});
    	colA3SubGrid.push({text: 'Amount Paid/Credited',style:'subtableHeader'});
	    partA3Body.push(colA3SubGrid);
	    
	     //Sub Grid Data
	    subGridA3Data = eval('pdfData.partabtxt.tanA3' + partA3['TA3']);
	    
	     subGridA3Data.forEach(function(subA3){
	    	subRowA3 = new Array();
		    subRowA3.push({text:subA3['A31'],style :'dataFieldStyle'});
		    subRowA3.push({text:subA3['A32'],style :'dataFieldStyle'});
		    subRowA3.push({text:subA3['A33'],style :'dataFieldStyle'});
		    subRowA3.push({text:subA3['A34'],style :'dataFieldStyle'});
		    subRowA3.push({text:subA3['A35'],style :'dataFieldStyle'});
		    subRowA3.push({text:parseFloat(subA3['A36']).toFixed(2),style :'amtFieldStyle'});
		    //subRowA3.push({text:parseFloat(subA3['III7']).toFixed(2),style :'amtFieldStyle'});
		    //subRowA3.push({text:parseFloat(subA3['III8']).toFixed(2),style :'amtFieldStyle'});
		    partA3Body.push(subRowA3);
	    }); 
	});	
	}
	/******************************Part III Ends**************************/
	
	// CR 743 changes starts 
	/********************** Part V Starts**************/
	/**********************Part A5 : Starts(CR743)****************/
	if (pdfData.partVtxt.detPV.length == 0 && assYrSelVal>='2023'){
		//Main Table Headers
		colA5Grid = new Array();
		colA5Grid.push({text: bundle_lbl_srNo, style:'tableHeader'});
		colA5Grid.push({text: 'Acknowledgement Number', style:'tableHeader'});
		colA5Grid.push({text: lbl_name_buyer, style:'tableHeader',colSpan: 2});
		colA5Grid.push({text:''});
		colA5Grid.push({text: 'PAN of  Buyer', style: 'tableHeader'});
    	colA5Grid.push({text: 'Transaction Date',style:'tableHeader'});
    	colA5Grid.push({text: 'Total Transaction Amount',style:'tableHeader'});
		
		partA5Body.push(colA5Grid);
		
		//Main Table Data
		RowA5 = new Array();
	    RowA5.push({text:" ",height:20});
		RowA5.push({text:" ",height:20});
		RowA5.push({text:" ",height:20,colSpan: 2});
		RowA5.push({text:" ",height:20});
		RowA5.push({text:" ",height:20});
	    RowA5.push({text:" ",height:20});
	    RowA5.push({text:" ",height:20});
		partA5Body.push(RowA5);
		
		RowA5_1 = new Array();
	    RowA5_1.push({text:"Sr. No ",height:20,rowSpan: 2,style:'subtableHeader'});
		RowA5_1.push({text:"Challan Details mentioned in the Statement",height:20,colSpan: 5,style:'subtableHeader'});
		RowA5_1.push({text:" ",height:20});
		RowA5_1.push({text:" ",height:20});
		RowA5_1.push({text:" ",height:20});
		RowA5_1.push({text:" ",height:20});
	    RowA5_1.push({text:"Status of Booking*",height:20,rowSpan: 2,style:'subtableHeader'});
		partA5Body.push(RowA5_1);
	    
	    //Sub Grid Headers
	    colA5SubGrid = new Array();
	    colA5SubGrid.push({text: "", style:'subtableHeader'});
    	colA5SubGrid.push({text: 'BSR Code', style:'subtableHeader'});
    	colA5SubGrid.push({text: 'Date of Deposit', style:'subtableHeader'});
		colA5SubGrid.push({text: 'Challan Serial Number',style:'subtableHeader'});
		colA5SubGrid.push({text: 'Total Tax Amount',style:'subtableHeader',colSpan: 2});
    	colA5SubGrid.push({text: "",style:'subtableHeader'});
		colA5SubGrid.push({text: "",style:'subtableHeader'});
	    partA5Body.push(colA5SubGrid);
	    
	    sumColdA5 = new Array();
		sumColdA5.push({text: 'Gross Total Across Buyer(s)', style:'tableHeader',colSpan: 6})
		sumColdA5.push("");
		sumColdA5.push("");
	    sumColdA5.push("");
	    sumColdA5.push("");
	    sumColdA5.push("");
	    sumColdA5.push({text:" ", height:40,style:'amtFieldHeader',colSpan: 2});
	    partA5Body.push(sumColdA5);   
	 }else if(assYrSelVal>='2023'){
 	 	pdfData.partVtxt.detPV.forEach(function(partV){
		//Main Table Headers
		colA5Grid = new Array();
		colA5Grid.push({text: bundle_lbl_srNo, style:'tableHeader'});
		colA5Grid.push({text: 'Acknowledgement Number', style:'tableHeader'});
		colA5Grid.push({text: lbl_name_buyer, style:'tableHeader',colSpan: 2});
		colA5Grid.push({text:''});
		colA5Grid.push({text: 'PAN of  Buyer', style: 'tableHeader'});
    	colA5Grid.push({text: 'Transaction Date',style:'tableHeader'});
    	colA5Grid.push({text: 'Total Transaction Amount',style:'tableHeader'});
    	
		partA5Body.push(colA5Grid);
		
		//Main Table Data
		
		RowA5 = new Array();
	    RowA5.push({text:partV['1PV'],style :'dataFieldStyle'});
	    RowA5.push({text:partV['APV'],style :'dataFieldStyle'});
		RowA5.push({text:partV['3PV'],style :'dataFieldStyle',colSpan: 2});
		RowA5.push({text:''});
		RowA5.push({text:partV['PPV'],style :'dataFieldStyle'});
	    RowA5.push({text:partV['5PV'],style :'dataFieldStyle'});
	    RowA5.push({text:parseFloat(partV['6PV']).toFixed(2),style :'amtFieldStyle'});
	    partA5Body.push(RowA5);
	    
	    RowA5_1 = new Array();
	    RowA5_1.push({text:"Sr. No ",height:20,rowSpan: 2,style:'subtableHeader'});
		RowA5_1.push({text:"Challan Details mentioned in the Statement",height:20,colSpan: 5,style:'subtableHeader'});
		RowA5_1.push({text:" ",height:20});
		RowA5_1.push({text:" ",height:20});
		RowA5_1.push({text:" ",height:20});
		RowA5_1.push({text:" ",height:20});
		RowA5_1.push({text:"Status of Booking*",height:20,rowSpan: 2,style:'subtableHeader'});
		partA5Body.push(RowA5_1);
	    
	    //Sub Grid Headers
	    colA5SubGrid = new Array();
	    colA5SubGrid.push({text: "", style:'subtableHeader'});
    	colA5SubGrid.push({text: 'BSR Code', style:'subtableHeader'});
		colA5SubGrid.push({text: 'Date of Deposit', style:'subtableHeader'});		
    	colA5SubGrid.push({text: 'Challan Serial Number',style:'subtableHeader'});
    	colA5SubGrid.push({text: 'Total Tax Amount',style:'subtableHeader',colSpan: 2});
    	colA5SubGrid.push({text: "",style:'subtableHeader'});
		colA5SubGrid.push({text: "",style:'subtableHeader'});
	    partA5Body.push(colA5SubGrid);
	    
	    subGridA5Data = eval('pdfData.partVtxt.PartV' + partV['APV'] + partV['PPV']);	    
	    
	    subGridA5Data.forEach(function(subPV){
	    subRowA5 = new Array();
	    
		subRowA5.push({text:subPV['PV1'],style :'dataFieldStyle'});
		subRowA5.push({text:subPV['PV2'],style :'dataFieldStyle'});
		subRowA5.push({text:subPV['PV3'],style :'dataFieldStyle'});
		subRowA5.push({text:subPV['PV4'],style :'dataFieldStyle'});
		subRowA5.push({text:parseFloat(subPV['PV5']).toFixed(2),style :'amtFieldStyle',colSpan: 2});
		subRowA5.push({text:""});
		subRowA5.push({text:subPV['PV6'],style :'dataFieldStyle'});
		partA5Body.push(subRowA5);		
	   }); 
	  
	});
	 sumGridA5 = eval('pdfData.partVsum.split("^")');
	 sumColdA5 = new Array();
	 sumColdA5.push({text: 'Gross Total Across Buyer(s)', style:'tableHeader',colSpan: 6})
	 sumColdA5.push("");	
	 sumColdA5.push("");
	 sumColdA5.push("");
	 sumColdA5.push("");
	 sumColdA5.push("");
	 sumColdA5.push({text: sumGridA5[0], style:'amtFieldHeader'});
	 partA5Body.push(sumColdA5);   
	}	 
		/**********************Part V : Ends****************/
		
		/**********************Part A9 : Starts(CR743)****************/
	if (pdfData.partIXtxt.detPIX.length == 0 && assYrSelVal>='2023'){
		//Main Table Headers
		colA9Grid = new Array();
		colA9Grid.push({text: bundle_lbl_srNo, style:'tableHeader'});
		colA9Grid.push({text: 'Acknowledgement Number', style:'tableHeader'});
		colA9Grid.push({text: lbl_name_seller, style:'tableHeader',colSpan: 2});
		//colA9Grid.push({text:''});
		colA9Grid.push({text:''});
		colA9Grid.push({text: 'PAN of  Seller', style: 'tableHeader'});
    	colA9Grid.push({text: 'Transaction Date',style:'tableHeader'});
    	colA9Grid.push({text: 'Total Transaction Amount',style:'tableHeader'});
    	colA9Grid.push({columns : [{text: 'Total Amount Deposited other than TDS',width:'auto'},{text:'###',fontSize:5,width:10}],style:'tableHeader'});
		
		partA9Body.push(colA9Grid);
		
		//Main Table Data
		RowA9 = new Array();
	    RowA9.push({text:" ",height:20});
		RowA9.push({text:" ",height:20});
		RowA9.push({text:" ",height:20,colSpan: 2});
		//RowA9.push({text:" ",height:20});
		RowA9.push({text:" ",height:20});
	    RowA9.push({text:" ",height:20});
	    RowA9.push({text:" ",height:20});
	    RowA9.push({text:" ",height:20});
		RowA9.push({text:" ",height:20});
		partA9Body.push(RowA9);
	    
	    RowA9_1 = new Array();
	    RowA9_1.push({text:"Sr. No ",height:20,rowSpan: 2,style:'subtableHeader'});
		RowA9_1.push({text:"Challan Details",height:20,colSpan: 4,style:'subtableHeader'});
		RowA9_1.push({text:" ",height:20});
		RowA9_1.push({text:" ",height:20});
		RowA9_1.push({text:" ",height:20});
		RowA9_1.push({text:"Status of Booking*",height:20,rowSpan: 2,style:'subtableHeader'});
		//RowA9_1.push({text:" ",height:20});
		RowA9_1.push({text:"Demand Payment",height:20,rowSpan: 2,style:'subtableHeader'});
		RowA9_1.push({columns : [{text: 'Total Amount Deposited other than TDS',width:'auto'},{text:'###',fontSize:5,width:10}],height:20,rowSpan: 2,style:'subtableHeader'});
		partA9Body.push(RowA9_1);
		
	    //Sub Grid Headers
	    colA9SubGrid = new Array();
	    colA9SubGrid.push({text: bundle_lbl_srNo, style:'subtableHeader',height:20});
    	colA9SubGrid.push({text: 'BSR Code', style:'subtableHeader'});
    	colA9SubGrid.push({text: 'Date of Deposit', style:'subtableHeader'});
		colA9SubGrid.push({text: 'Challan Serial Number',style:'subtableHeader'});
    	colA9SubGrid.push({text: 'Total Tax Amount',style:'subtableHeader'});
   	 	colA9SubGrid.push({text: 'Status of Booking*', style:'subtableHeader'});
   	 	//colA9SubGrid.push({text: "",style:'subtableHeader'});
    	colA9SubGrid.push({text: "",style:'subtableHeader'});
    	colA9SubGrid.push({text: "",style:'subtableHeader'});
	    partA9Body.push(colA9SubGrid);
	    
	    sumColdA9 = new Array();
		sumColdA9.push({text: 'Gross Total Across Seller(s)', style:'tableHeader',colSpan: 6})
		sumColdA9.push("");
		sumColdA9.push("");
	    sumColdA9.push("");
	    sumColdA9.push("");
	    sumColdA9.push("");
		//sumColdA9.push("");
	    sumColdA9.push({text:" ", height:20,style:'amtFieldHeader'});
	    sumColdA9.push({text:" ", height:20,style:'amtFieldHeader'});
	    partA9Body.push(sumColdA9);   
	 }else if(assYrSelVal>='2023'){
 	 	pdfData.partIXtxt.detPIX.forEach(function(partIX){
		//Main Table Headers
		colA9Grid = new Array();
		colA9Grid.push({text: bundle_lbl_srNo, style:'tableHeader'});
		colA9Grid.push({text: 'Acknowledgement Number', style:'tableHeader'});
		colA9Grid.push({text: lbl_name_seller, style:'tableHeader',colSpan: 2});
		colA9Grid.push({text:''});
		//colA9Grid.push({text:''});
		colA9Grid.push({text: 'PAN of  Seller', style: 'tableHeader'});
    	colA9Grid.push({text: 'Transaction Date',style:'tableHeader'});
    	colA9Grid.push({text: 'Total Transaction Amount',style:'tableHeader'});
    	colA9Grid.push({columns : [{text: 'Total Amount Deposited other than TDS',width:'auto'},{text:'###',fontSize:5,width:10}],style:'tableHeader'});
		partA9Body.push(colA9Grid);
		
		
		//Main Table Data
		RowA9 = new Array();
	    RowA9.push({text:partIX['1PIX'],style :'dataFieldStyle'});
	    RowA9.push({text:partIX['APIX'],style :'dataFieldStyle'});
		RowA9.push({text:partIX['3PIX'],style :'dataFieldStyle',colSpan: 2});
		RowA9.push({text:" "});
		//RowA9.push({text:" "});
	    RowA9.push({text:partIX['PPIX'],style :'dataFieldStyle'});
	    RowA9.push({text:partIX['5PIX'],style :'dataFieldStyle'});
	    RowA9.push({text:parseFloat(partIX['6PIX']).toFixed(2),style :'amtFieldStyle'});
	    RowA9.push({text:parseFloat(partIX['7PIX']).toFixed(2),style :'amtFieldStyle'});
	    partA9Body.push(RowA9);
	    
	    RowA9_1 = new Array();
	    RowA9_1.push({text:"Sr. No ",height:20,rowSpan: 2,style:'subtableHeader'});
		RowA9_1.push({text:"Challan Details",height:20,colSpan: 4,style:'subtableHeader'});
		RowA9_1.push({text:" ",height:20});
		RowA9_1.push({text:" ",height:20});
		RowA9_1.push({text:" ",height:20});
		RowA9_1.push({text:"Status of Booking*",height:20,rowSpan: 2,style:'subtableHeader'});
		//RowA9_1.push({text:" ",height:20});
		RowA9_1.push({text:"Demand Payment",height:20,rowSpan: 2,style:'subtableHeader'});
		RowA9_1.push({columns : [{text: 'Total Amount Deposited other than TDS',width:'auto'},{text:'###',fontSize:5,width:10}],height:20,rowSpan: 2,style:'subtableHeader'});
		partA9Body.push(RowA9_1);
		
	    //Sub Grid Headers
	    colA9SubGrid = new Array();
	    colA9SubGrid.push({text: bundle_lbl_srNo, style:'subtableHeader', height:20});
    	colA9SubGrid.push({text: 'BSR Code', style:'subtableHeader'});
    	colA9SubGrid.push({text: 'Date of Deposit', style:'subtableHeader'});
    	colA9SubGrid.push({text: 'Challan Serial Number',style:'subtableHeader'});
		colA9SubGrid.push({text: 'Total Tax Amount',style:'subtableHeader'});
   	 	colA9SubGrid.push({text: 'Status of Booking*', style:'subtableHeader'});
   	 	//colA9SubGrid.push({text: "",style:'subtableHeader'});
		colA9SubGrid.push({text: 'Demand Payment',style:'subtableHeader'});
    	colA9SubGrid.push({columns : [{text: 'Total Amount Deposited other than TDS',width:'auto'},{text:'###',fontSize:5,width:10}],style:'subtableHeader'});
	    partA9Body.push(colA9SubGrid);
	    
	    subGridA9Data = eval('pdfData.partIXtxt.PartIX' + partIX['APIX'] + partIX['PPIX']);	    
	    
	    subGridA9Data.forEach(function(subPIX){
	    subRowA9 = new Array();
		subRowA9.push({text:subPIX['PIX1'],style :'dataFieldStyle'});
		subRowA9.push({text:subPIX['PIX2'],style :'dataFieldStyle'});
		subRowA9.push({text:subPIX['PIX3'],style :'dataFieldStyle'});
		subRowA9.push({text:subPIX['PIX4'],style :'dataFieldStyle'});
		subRowA9.push({text:parseFloat(subPIX['PIX5']).toFixed(2),style :'amtFieldStyle'});
		subRowA9.push({text:subPIX['PIX6'],style :'dataFieldStyle'});
		//subRowA9.push({text:""});
		subRowA9.push({text:subPIX['PIX7'],style :'dataFieldStyle'});
		subRowA9.push({text:parseFloat(subPIX['PIX8']).toFixed(2),style :'amtFieldStyle'});
		partA9Body.push(subRowA9);		
	   }); 
	  
	});
	 	sumGridA9 = eval('pdfData.partIXsum.split("^")');
	 	sumColdA9 = new Array();
	 	sumColdA9.push({text: 'Gross Total Across Seller(s)', style:'tableHeader',colSpan: 6})
		sumColdA9.push("");
	    sumColdA9.push("");
		sumColdA9.push("");
	    sumColdA9.push("");
	    sumColdA9.push("");
		//sumColdA9.push("");
	    sumColdA9.push({text: sumGridA9[0], style:'amtFieldHeader'});
	    sumColdA9.push({text: sumGridA9[1], style:'amtFieldHeader'});
	    partA9Body.push(sumColdA9);   
	}	 
		
	/******************************Part IX Ends**************************/
	//CR743 end
	
		/******************************Part B : Starts****************/
   	if (pdfData.partabtxt.detB.length == 0){
		//Main Table Headers
		colBGrid = new Array();
		colBGrid.push({text: bundle_lbl_srNo, style:'tableHeader'});
		colBGrid.push({text: lbl_nameColctr, style:'tableHeader',colSpan:4});
		colBGrid.push('');
    	colBGrid.push('');
    	colBGrid.push('');
    	colBGrid.push({text: 'TAN of Collector', style:'tableHeader'});
    	colBGrid.push({text: 'Total Amount Paid/Debited', style: 'tableHeader'});
    	colBGrid.push({columns : [{text: 'Total Tax Collected',width:'auto'},{text:'+',fontSize:5,width:5}], style:'tableHeader'});
    	colBGrid.push({text: 'Total TCS Deposited',style:'tableHeader'});
		partBBody.push(colBGrid);
		
		//Main Table Data
		rowB = new Array();
	    rowB.push({text :" ",height:20});
	    rowB.push({text :'',colSpan: 4,height:20});
	    rowB.push("");
	    rowB.push("");
	    rowB.push("");
	    rowB.push({text :" ",height:20});
	    rowB.push({text :" ",height:20});
	    rowB.push({text :" ",height:20});
	    rowB.push({text :" ",height:20});
	    partBBody.push(rowB);
	    
	    //Sub Grid Headers
	    colBSubGrid = new Array();
	    colBSubGrid.push({text: bundle_lbl_srNo, style:'subtableHeader'});
    	colBSubGrid.push({columns : [{text: 'Section',width:'auto'},{text:'1',fontSize:5,width:5}], style:'subtableHeader'});
    	colBSubGrid.push({text: 'Transaction Date',style:'subtableHeader'});
    	colBSubGrid.push({text: 'Status of Booking*',style:'subtableHeader'});
   	 	colBSubGrid.push({text: 'Date of Booking', style:'subtableHeader'});
    	colBSubGrid.push({text: 'Remarks**',style:'subtableHeader'});
    	colBSubGrid.push({text: 'Amount Paid/Debited',style:'subtableHeader'});
    	colBSubGrid.push({columns : [{text: 'Tax Collected',width:'auto'},{text:'++',fontSize:5,width:10}], style:'subtableHeader'});
    	colBSubGrid.push({text: 'TCS Deposited',style:'subtableHeader'}); 
	    partBBody.push(colBSubGrid);
	 }else{
	 	pdfData.partabtxt.detB.forEach(function(partB){
		//Main Table Headers
		colBGrid = new Array();
		colBGrid.push({text: bundle_lbl_srNo, style:'tableHeader'});
		colBGrid.push({text: lbl_nameColctr, style:'tableHeader',colSpan:4});
		colBGrid.push('');
    	colBGrid.push('');
    	colBGrid.push('');
    	colBGrid.push({text: 'TAN of Collector', style:'tableHeader'});
    	colBGrid.push({text: 'Total Amount Paid/Debited', style: 'tableHeader'});
    	colBGrid.push({columns : [{text: 'Total Tax Collected',width:'auto'},{text:'+',fontSize:5,width:5}], style:'tableHeader'});
    	colBGrid.push({text: 'Total TCS Deposited',style:'tableHeader'});
		partBBody.push(colBGrid);
		
		//Main Table Data
		 rowB = new Array();
	    rowB.push({text:partB['1B'],style :'dataFieldStyle'});
	    rowB.push({text:partB['2B'],style :'dataFieldStyle',colSpan:4});
	    rowB.push("");
	    rowB.push("");
	    rowB.push("");
	    rowB.push({text:partB['TB'],style :'dataFieldStyle'});
	    rowB.push({text:partB['4B'],style :'dataFieldStyle'});
	    rowB.push({text:parseFloat(partB['5B']).toFixed(2),style :'amtFieldStyle'});
	    rowB.push({text:parseFloat(partB['6B']).toFixed(2),style :'amtFieldStyle'});
	    partBBody.push(rowB);
	    
	    
	       //Sub Grid Headers
	    colBSubGrid = new Array();
	    colBSubGrid.push({text: bundle_lbl_srNo, style:'subtableHeader'});
    	colBSubGrid.push({columns : [{text: 'Section',width:'auto'},{text:'1',fontSize:5,width:5}], style:'subtableHeader'});
    	colBSubGrid.push({text: 'Transaction Date',style:'subtableHeader'});
    	colBSubGrid.push({text: 'Status of Booking*',style:'subtableHeader'});
   	 	colBSubGrid.push({text: 'Date of Booking', style:'subtableHeader'});
    	colBSubGrid.push({text: 'Remarks**',style:'subtableHeader'});
    	colBSubGrid.push({text: 'Amount Paid/Debited',style:'subtableHeader'});
    	colBSubGrid.push({columns : [{text: 'Tax Collected',width:'auto'},{text:'++',fontSize:5,width:10}], style:'subtableHeader'});
    	colBSubGrid.push({text: 'TCS Deposited',style:'subtableHeader'}); 
	    partBBody.push(colBSubGrid);
	    
	    subGridBData = eval('pdfData.partabtxt.tanB' + partB['TB']);	    
	    
	   subGridBData.forEach(function(subB){
	    subRowB = new Array();
		subRowB.push({text:subB['B1'],style :'dataFieldStyle'});
		subRowB.push({text:subB['B2'],style :'dataFieldStyle'});
		subRowB.push({text:subB['B3'],style :'dataFieldStyle'});
		subRowB.push({text:subB['B4'],style :'dataFieldStyle'});
		subRowB.push({text:subB['B5'],style :'dataFieldStyle'});
		subRowB.push({text:subB['B6'],style :'dataFieldStyle'});
		subRowB.push({text:parseFloat(subB['B7']).toFixed(2),style :'amtFieldStyle'});
		subRowB.push({text:parseFloat(subB['B8']).toFixed(2),style :'amtFieldStyle'});
		subRowB.push({text:parseFloat(subB['B9']).toFixed(2),style :'amtFieldStyle'}); 
		partBBody.push(subRowB);		
	   });  
	});	
	}
		/**********************Part B : Ends****************/
	
	/*****************************Part C : Start*************************************************/ 
	if (pdfData.partctxt.detC.length == 0){
			//Main Table Headers
			colCGrid = new Array();
			colCGrid.push({text: bundle_lbl_srNo, style:'tableHeader'});
	    	colCGrid.push({columns : [{text: 'Major Head',width:'auto'},{text:'3',fontSize:5,width:5}], style:'tableHeader'});
	    	colCGrid.push({columns : [{text: 'Minor Head',width:'auto'},{text:'2',fontSize:5,width:5}], style:'tableHeader'});
	    	colCGrid.push({text: 'Tax', style: 'tableHeader'});
	    	colCGrid.push({text: 'Surcharge', style: 'tableHeader'});
	    	colCGrid.push({text: 'Education Cess', style: 'tableHeader'});
	    	colCGrid.push({text: lbl_pnlAmt, style: 'tableHeader'}); //CR- 638 - New column changes 
	    	colCGrid.push({text: lbl_intAmt, style: 'tableHeader'}); //CR- 638 - New column changes
	    	colCGrid.push({text: 'Others',style:'tableHeader'});
	    	colCGrid.push({text: 'Total Tax',style:'tableHeader'});
	    	colCGrid.push({text: lbl_bsr, style:'tableHeader'});
	    	colCGrid.push({text: lbl_dateofdep, style: 'tableHeader'});
	    	colCGrid.push({text: 'Challan Serial  Number', style: 'tableHeader'});
	    	colCGrid.push({text: 'Remarks**',style:'tableHeader'});
			partCBody.push(colCGrid);

	   }
	   else{
	   			//Main Table Headers
			colCGrid = new Array();
			colCGrid.push({text: bundle_lbl_srNo, style:'tableHeader'});
	    	colCGrid.push({columns : [{text: 'Major Head',width:'auto'},{text:'3',fontSize:5,width:5}], style:'tableHeader'});
	    	colCGrid.push({columns : [{text: 'Minor Head',width:'auto'},{text:'2',fontSize:5,width:5}], style:'tableHeader'});
	    	colCGrid.push({text: 'Tax', style: 'tableHeader'});
	    	colCGrid.push({text: 'Surcharge', style: 'tableHeader'});
	    	colCGrid.push({text: 'Education Cess', style: 'tableHeader'});
	    	colCGrid.push({text: lbl_pnlAmt, style: 'tableHeader'}); //CR- 638 - New column changes
	    	colCGrid.push({text: lbl_intAmt, style: 'tableHeader'}); //CR- 638 - New column changes
	    	colCGrid.push({text: 'Others',style:'tableHeader'});
	    	colCGrid.push({text: 'Total Tax',style:'tableHeader'});
	    	colCGrid.push({text: lbl_bsr, style:'tableHeader'});
	    	colCGrid.push({text: lbl_dateofdep, style: 'tableHeader'});	    	
	    	colCGrid.push({text: 'Challan Serial  Number', style: 'tableHeader'});
	    	colCGrid.push({text: 'Remarks**',style:'tableHeader'});
			partCBody.push(colCGrid);
			
			 //Main Table Data
		pdfData.partctxt.detC.forEach(function(partc){
			rowC = new Array();
		    rowC.push({text:partc['C1'],style :'dataFieldStyle'});
		    rowC.push({text:partc['C2'],style :'dataFieldStyle'});
		    rowC.push({text:partc['C3'],style :'dataFieldStyle'});
		    rowC.push({text:partc['C4'],style :'dataFieldStyle'});
		    rowC.push({text:parseFloat(partc['C5']).toFixed(2),style :'amtFieldStyle'});
		    rowC.push({text:parseFloat(partc['C6']).toFixed(2),style :'amtFieldStyle'});
		    rowC.push({text:parseFloat(partc['C7']).toFixed(2),style :'amtFieldStyle'}); //CR- 638 - New column changes
		    rowC.push({text:parseFloat(partc['C8']).toFixed(2),style :'amtFieldStyle'}); //CR- 638 - New column changes
		    rowC.push({text:parseFloat(partc['C9']).toFixed(2),style :'amtFieldStyle'});
		    rowC.push({text:partc['C10'],style :'dataFieldStyle'});
		    rowC.push({text:partc['C11'],style :'dataFieldStyle'});
		    rowC.push({text:partc['C12'],style :'dataFieldStyle'});
		    rowC.push({text:partc['C13'],style :'dataFieldStyle'});
		    rowC.push({text:partc['C14'],style :'dataFieldStyle'});
		    partCBody.push(rowC); 
		   });
	   }
	
	
	/*****************************Part D : Start*************************************************/ 
		//Main Table Headers
	if (pdfData.partdtxt.detD.length == 0){
			colDGrid = new Array();
			colDGrid.push({text: bundle_lbl_srNo, style:'tableHeader'});
	    	colDGrid.push({text: 'Assessment Year', style:'tableHeader'});
	    	colDGrid.push({text: lbl_modeofpaymnt, style:'tableHeader'});
	    	colDGrid.push({text: lbl_tan_pan_26AS, style: 'tableHeader'});
	    	colDGrid.push({text: lbl_source_26AS, style: 'tableHeader'});
	    	colDGrid.push({text: 'Amount of Refund', style: 'tableHeader'});
	    	colDGrid.push({text: lbl_interest,style:'tableHeader'});
	    	colDGrid.push({text: 'Date of Payment',style:'tableHeader'});
	    	colDGrid.push({text: lbl_remarks, style:'tableHeader'});
			partDBody.push(colDGrid);
		 
	   }
	   else{
	   		colDGrid = new Array();
			colDGrid.push({text: bundle_lbl_srNo, style:'tableHeader'});
	    	colDGrid.push({text: 'Assessment Year', style:'tableHeader'});
	    	colDGrid.push({text: lbl_modeofpaymnt, style:'tableHeader'});
	    	colDGrid.push({text: lbl_tan_pan_26AS, style: 'tableHeader'});
	    	colDGrid.push({text: lbl_source_26AS, style: 'tableHeader'});
	    	colDGrid.push({text: 'Amount of Refund', style: 'tableHeader'});
	    	colDGrid.push({text: lbl_interest,style:'tableHeader'});
	    	colDGrid.push({text: 'Date of Payment',style:'tableHeader'});
	    	colDGrid.push({text: lbl_remarks, style:'tableHeader'});
			partDBody.push(colDGrid);
			
		 	  //Main Table Data
		pdfData.partdtxt.detD.forEach(function(partd){
			rowD = new Array();
		    rowD.push({text:partd['D1'],style :'dataFieldStyle'});
		    if(partd['D2'].indexOf('-')>-1){
		    	rowD.push({text:partd['D2'],style :'dataFieldStyle'});
		    }else{
		    	var finalAssmtYr = partd['D2'].trim() + "-" + (parseInt(partd['D2'].substr(2))+1).toString();
		    	rowD.push({text:finalAssmtYr,style :'dataFieldStyle'});
		    }
		    //rowD.push({text:partd['D2'],style :'dataFieldStyle'});
		    rowD.push({text:partd['D3'],style :'dataFieldStyle'});
		    rowD.push({text:partd['D4'],style :'dataFieldStyle'});
		    rowD.push({text:partd['D5'],style :'dataFieldStyle'});
		    if(partd['D6']!=null && partd['D6']!="NA" && partd['D6']!=""){
		   		 rowD.push({text:parseFloat(partd['D6']).toFixed(2),style :'amtFieldStyle'});
		    }else{
		    	rowD.push({text:'NA',style :'amtFieldStyle'});
		    }
		    if(partd['D7']!=null && partd['D7']!="NA" && partd['D7']!=""){
		   		 rowD.push({text:parseFloat(partd['D7']).toFixed(2),style :'amtFieldStyle'});
		    }else{
		    	rowD.push({text:'NA',style :'amtFieldStyle'});
		    }
		    rowD.push({text:partd['D8'],style :'dataFieldStyle'});
		    rowD.push({text:partd['D9'],style :'dataFieldStyle'});
		    partDBody.push(rowD); 
		   });  
	   }
	 
	  /*****************************Part E : Start*************************************************/ 
		
		//Main Table Headers
	if (pdfData.partetxt.detE.length == 0 && assYrSelVal>'2016' ){
			
		colEGrid = new Array();
		colEGrid.push({text: bundle_lbl_srNo,width:250, style:'tableHeader'});
		colEGrid.push({columns : [{text: 'Type Of Transaction',width:100},{text:'4',fontSize:5,width:5}], style:'tableHeader'});
	    colEGrid.push({columns : [{text: 'Name of SFT Filer',width:200},{text:'',fontSize:5,width:3}], style:'tableHeader'});
		colEGrid.push({columns : [{text: lbl_transDate,width:60},{text:'',fontSize:5,width:3}], style:'tableHeader'});
		colEGrid.push({columns : [{text: 'Amount (Rs.)',width:66},{text:'',fontSize:5,width:3}], style:'tableHeader'});
		colEGrid.push({columns : [{text: 'Remarks**',width:54},{text:'',fontSize:5,width:3}], style:'tableHeader'});
		partEBody.push(colEGrid);
				
	 }else if(pdfData.partetxt.detE.length == 0){ 
		colEGrid = new Array();
		colEGrid.push({text: bundle_lbl_srNo, style:'tableHeader'});
		colEGrid.push({columns : [{text: 'Type Of Transaction',width:'auto'},{text:'4',fontSize:5,width:3}], style:'tableHeader'});
		colEGrid.push({columns : [{text: 'Name of AIR Filer',width:98},{text:'',fontSize:5,width:3}], style:'tableHeader'});
		colEGrid.push({columns : [{text: lbl_transDate,width:55},{text:'',fontSize:5,width:3}], style:'tableHeader'});
		colEGrid.push({columns : [{text: 'Single/Joint\nParty Transaction',width:60},{text:'',fontSize:5,width:3}], style:'tableHeader'});
		colEGrid.push({columns : [{text: 'Number of Parties',width:55},{text:'',fontSize:5,width:3}], style:'tableHeader'});
	    colEGrid.push({columns : [{text: lbl_taxPayer_amount,width:50},{text:'',fontSize:5,width:3}], style:'tableHeader'});
		colEGrid.push({columns : [{text: lbl_modeofpaymnt,width:30},{text:'',fontSize:5,width:3}], style:'tableHeader'});
		colEGrid.push({columns : [{text: 'Remarks**',width:35},{text:'',fontSize:5,width:3}], style:'tableHeader'});
		partEBody.push(colEGrid);
	}
	 else if(assYrSelVal>'2016'){
	 
	 		 colEGrid = new Array();
			colEGrid.push({text: bundle_lbl_srNo,width:250, style:'tableHeader'});
			colEGrid.push({columns : [{text: 'Type Of Transaction',width:'auto'},{text:'4',fontSize:5,width:5}], style:'tableHeader'});
	    	colEGrid.push({columns : [{text: 'Name of SFT Filer',width:200},{text:'',fontSize:5,width:3}], style:'tableHeader'});
			colEGrid.push({columns : [{text: lbl_transDate,width:60},{text:'',fontSize:5,width:3}], style:'tableHeader'});
			colEGrid.push({columns : [{text: 'Amount (Rs.)',width:60},{text:'',fontSize:5,width:3}], style:'tableHeader'});
			colEGrid.push({columns : [{text: 'Remarks**',width:50},{text:'',fontSize:5,width:3}], style:'tableHeader'});
			partEBody.push(colEGrid);
			
		 	  //Main Table Data
	 	pdfData.partetxt.detE.forEach(function(parte){
			rowE = new Array();
		    rowE.push({text:parte['E1'],style :'dataFieldStyle'});
		    rowE.push({text:parte['E2'],style :'dataFieldStyle'});
		    rowE.push({text:parte['E3'],style :'dataFieldStyle'});
		    rowE.push({text:parte['E4'],style :'dataFieldStyle'});
		    rowE.push({text:parte['E7'],style :'amtFieldStyle'});
		    rowE.push({text:parte['E9'],style :'dataFieldStyle'});
		    partEBody.push(rowE); 
		   });  
	 }
	 
	 
	 else{
	
	 		 colEGrid = new Array();
			colEGrid.push({text: bundle_lbl_srNo, style:'tableHeader'});
	    	colEGrid.push({columns : [{text: 'Type Of Transaction',width:'auto'},{text:'4',fontSize:5,width:5}], style:'tableHeader'});
	    	colEGrid.push({text: 'Name of AIR Filer', style:'tableHeader'});
	    	colEGrid.push({text: lbl_transDate, style: 'tableHeader'});
	    	colEGrid.push({text: 'Single/Joint\nParty Transaction', style: 'tableHeader'});
	    	colEGrid.push({text: 'Number of Parties', style: 'tableHeader'});
	    	colEGrid.push({text: lbl_taxPayer_amount,style:'tableHeader'});
	    	colEGrid.push({text: lbl_modeofpaymnt,style:'tableHeader'});
	    	colEGrid.push({text: 'Remarks**', style:'tableHeader'});
			partEBody.push(colEGrid);
			
		 	  //Main Table Data
	 	pdfData.partetxt.detE.forEach(function(parte){
			rowE = new Array();
		    rowE.push({text:parte['E1'],style :'dataFieldStyle'});
		    rowE.push({text:parte['E2'],style :'dataFieldStyle'});
		    rowE.push({text:parte['E3'],style :'dataFieldStyle'});
		    rowE.push({text:parte['E4'],style :'dataFieldStyle'});
		  	rowE.push({text:parte['E5'],style :'dataFieldStyle'});
		    rowE.push({text:parte['E6'],style :'dataFieldStyle'});
		    rowE.push({text:parseFloat(parte['E7']).toFixed(2),style :'amtFieldStyle'});
		   	rowE.push({text:parte['E8'],style :'dataFieldStyle'});
		    rowE.push({text:parte['E9'],style :'dataFieldStyle'});
		    partEBody.push(rowE); 
		   });  
	 }
	 
	   /*****************************Part F : Start*************************************************/ 
	  if (pdfData.partftxt.detF.length == 0){
		//Main Table Headers
		colFGrid = new Array();
		colFGrid.push({text: bundle_lbl_srNo, style:'tableHeader'});
		colFGrid.push({text: 'Acknowledgement Number', style:'tableHeader'});
		if(assYrSelVal>='2023'){
			colFGrid.push({text: 'Name Of Deductee', style:'tableHeader',colSpan: 2});
			colFGrid.push({text:''});
		}else
			colFGrid.push({text: 'Name Of Deductee', style:'tableHeader'});
    	colFGrid.push({text: 'PAN of  Deductee', style: 'tableHeader'});
    	colFGrid.push({text: 'Transaction Date',style:'tableHeader'});
    	colFGrid.push({text: 'Total Transaction Amount',style:'tableHeader'});
    	colFGrid.push({text: 'Total TDS Deposited***',style:'tableHeader'});
    	colFGrid.push({columns : [{text: 'Total Amount Deposited other than TDS',width:'auto'},{text:'###',fontSize:5,width:10}],style:'tableHeader'});
		partFBody.push(colFGrid);
		
		 //Main Table Data
		rowF = new Array();
	    rowF.push({text :" ",height:20});
	    rowF.push({text :" ",height:20});
		if(assYrSelVal>='2023'){
			rowF.push({text:" ",height:20,colSpan: 2});
			rowF.push({text:" ",height:20});
		}else
			rowF.push({text :" ",height:20});
	    rowF.push({text :" ",height:20});
	    rowF.push({text :" ",height:20});
	    rowF.push({text :" ",height:20});
	    rowF.push({text :" ",height:20});
	    rowF.push({text :" ",height:20});
	    partFBody.push(rowF);
	    
	    //Sub Grid Headers
	     colFSubGrid = new Array();
	    colFSubGrid.push({text: bundle_lbl_srNo, style:'subtableHeader'});
    	colFSubGrid.push({text: 'TDS Certificate Number', style:'subtableHeader'});
		if(assYrSelVal>='2023'){
			colFSubGrid.push({columns : [{text: 'Section',width:'auto'},{text:'1',fontSize:5,width:5}], style:'subtableHeader'});
		}
    	colFSubGrid.push({text: 'Date of Deposit',style:'subtableHeader'});
    	colFSubGrid.push({text: 'Status of Booking*',style:'subtableHeader'});
   	 	colFSubGrid.push({text: 'Date of Booking', style:'subtableHeader'});
    	colFSubGrid.push({text: 'Demand Payment',style:'subtableHeader'});
    	colFSubGrid.push({text: 'TDS Deposited***',style:'subtableHeader'});
    	colFSubGrid.push({columns : [{text: 'Total Amount Deposited other than TDS',width:'auto'},{text:'###',fontSize:5,width:10}],style:'subtableHeader'});
	    partFBody.push(colFSubGrid);
	    
	    sumColdF = new Array();
		if(assYrSelVal>='2023'){
			sumColdF.push({text: 'Gross Total Across Deductee(s)', style:'tableHeader',colSpan: 6})
			sumColdF.push("");
		}else
			sumColdF.push({text: 'Gross Total Across Deductor(s)', style:'tableHeader',colSpan: 5})
	    sumColdF.push("");
	    sumColdF.push("");
	    sumColdF.push("");
	    sumColdF.push("");
	    sumColdF.push({text :" ",height:20,style:'amtFieldHeader'});
	    sumColdF.push({text :" ",height:20,style:'amtFieldHeader'});
	    sumColdF.push({text :" ",height:20,style:'amtFieldHeader'});
	    partFBody.push(sumColdF);  
	 }else{
	 pdfData.partftxt.detF.forEach(function(partF){
		//Main Table Headers
		colFGrid = new Array();
		colFGrid.push({text: bundle_lbl_srNo, style:'tableHeader'});
		colFGrid.push({text: 'Acknowledgement Number', style:'tableHeader'});
		if(assYrSelVal>='2023'){
			colFGrid.push({text: 'Name Of Deductee', style:'tableHeader',colSpan: 2});
			colFGrid.push({text:''});
		}else
			colFGrid.push({text: 'Name Of Deductee', style:'tableHeader'});
    	colFGrid.push({text: 'PAN of  Deductee', style: 'tableHeader'});
    	colFGrid.push({text: 'Transaction Date',style:'tableHeader'});
    	colFGrid.push({text: 'Total Transaction Amount',style:'tableHeader'});
    	colFGrid.push({text: 'Total TDS Deposited***',style:'tableHeader'});
    	colFGrid.push({columns : [{text: 'Total Amount Deposited other than TDS',width:'auto'},{text:'###',fontSize:5,width:10}],style:'tableHeader'});
		partFBody.push(colFGrid);
		
		//Main Table Data
		
		    rowF = new Array();
	    rowF.push({text:partF['1F'],style :'dataFieldStyle'});
	    rowF.push({text:partF['FF'],style :'dataFieldStyle'});
		if(assYrSelVal>='2023'){
			rowF.push({text:partF['3F'],style :'dataFieldStyle',colSpan: 2});
			rowF.push({text:" "});
		}else
			rowF.push({text:partF['3F'],style :'dataFieldStyle'});
	    rowF.push({text:partF['FF4'],style :'dataFieldStyle'});
	    rowF.push({text:partF['5F'],style :'dataFieldStyle'});
	    rowF.push({text:parseFloat(partF['6F']).toFixed(2),style :'amtFieldStyle'});
	    rowF.push({text:parseFloat(partF['7F']).toFixed(2),style :'amtFieldStyle'});
	    rowF.push({text:parseFloat(partF['8F']).toFixed(2),style :'amtFieldStyle'}); 
	    partFBody.push(rowF);  
	    
	     //Sub Grid Headers
	    colFSubGrid = new Array();
	    colFSubGrid.push({text: bundle_lbl_srNo, style:'subtableHeader'});
    	colFSubGrid.push({text: 'TDS Certificate Number', style:'subtableHeader'});
		if(assYrSelVal>='2023'){
			colFSubGrid.push({columns : [{text: 'Section',width:'auto'},{text:'1',fontSize:5,width:5}], style:'subtableHeader'});
		}
    	colFSubGrid.push({text: 'Date of Deposit',style:'subtableHeader'});
    	colFSubGrid.push({text: 'Status of Booking*',style:'subtableHeader'});
   	 	colFSubGrid.push({text: 'Date of Booking', style:'subtableHeader'});
    	colFSubGrid.push({text: 'Demand Payment',style:'subtableHeader'});
    	colFSubGrid.push({text: 'TDS Deposited***',style:'subtableHeader'});
		colFSubGrid.push({columns : [{text: 'Total Amount Deposited other than TDS',width:'auto'},{text:'###',fontSize:5,width:10}],style:'subtableHeader'});
	    partFBody.push(colFSubGrid);
	    
	   subGridFData = eval('pdfData.partftxt.ackF' + partF['FF'] + partF['FF4']);	    
	    
	   subGridFData.forEach(function(subF){
	    subRowF = new Array();
		subRowF.push({text:subF['F1'],style :'dataFieldStyle'});
		subRowF.push({text:subF['F2'],style :'dataFieldStyle'});
		if(assYrSelVal>='2023'){
			subRowF.push({text:subF['F9'],style :'dataFieldStyle'});
		}
		subRowF.push({text:subF['F3'],style :'dataFieldStyle'});
		if(subF['F4']=='F'){
			    	subRowF.push({text:subF['F4'],color:'#009933',style :'dataFieldStyle'});
			    }else{
			    	subRowF.push({text:subF['F4'],color:'#CC0000',style :'dataFieldStyle'});
			    }
		subRowF.push({text:subF['F5'],style :'dataFieldStyle'});
		subRowF.push({text:subF['F6'],style :'dataFieldStyle'});
		subRowF.push({text:parseFloat(subF['F7']).toFixed(2),style :'amtFieldStyle'});
		subRowF.push({text:parseFloat(subF['F8']).toFixed(2),style :'amtFieldStyle'});
		partFBody.push(subRowF);		
	   });  
	  
	});
	  sumGridF = eval('pdfData.partfsum.split("^")');
	   
	  
	    sumColdF = new Array();
		if(assYrSelVal>='2023'){
			sumColdF.push({text: 'Gross Total Across Deductee(s)', style:'tableHeader',colSpan: 6})
			sumColdF.push("");
		}else
			sumColdF.push({text: 'Gross Total Across Deductor(s)', style:'tableHeader',colSpan: 5})
	    sumColdF.push("");
	    sumColdF.push("");
	    sumColdF.push("");
	    sumColdF.push("");
	    sumColdF.push({text: parseFloat(sumGridF[0]).toFixed(2), style:'amtFieldHeader'});
	    sumColdF.push({text: parseFloat(sumGridF[1]).toFixed(2), style:'amtFieldHeader'});
	    sumColdF.push({text: parseFloat(sumGridF[2]).toFixed(2), style:'amtFieldHeader'});
	    partFBody.push(sumColdF);     
	}
		/**********************Part F : Ends****************/
		
		/******************************Part G : Starts****************/
   	if (pdfData.partGtxt.detG.length == 0){
		//Main Table Headers
		colGGrid = new Array();
		colGGrid.push({text: bundle_lbl_srNo, style:'tableHeader'});
		colGGrid.push({text: lbl_financialYear, style:'tableHeader'});
    	colGGrid.push({text: lbl_shortPay, style:'tableHeader'});
		if(assYrSelVal>='2023'){
			colGGrid.push({text: 'Short Deduction/Collection', style: 'tableHeader'});
		}
		else
			colGGrid.push({text: lbl_shortDeduction, style: 'tableHeader'});
		if(assYrSelVal>='2023'){
			colGGrid.push({text: 'Interest on  TDS/TCS Payments Default',style:'tableHeader'});
		}
		else
			colGGrid.push({text: 'Interest on  TDS Payments Default',style:'tableHeader'});
		if(assYrSelVal>='2023'){
			colGGrid.push({text: 'Interest on TDS/TCS Deduction/Collection Default',style:'tableHeader'});
		}
    	else
			colGGrid.push({text: 'Interest on  TDS Deduction Default',style:'tableHeader'});
    	colGGrid.push({text: lbl_late_flng_levy,style:'tableHeader'});
    	colGGrid.push({text: lbl_intrst,style:'tableHeader'});
    	colGGrid.push({text: lbl_partGTD,style:'tableHeader'});
		partGBody.push(colGGrid);
		
		//Main Table Data
		rowG = new Array();
	    rowG.push({text :" ",height:20});
	    rowG.push({text :'',height:20});
	    rowG.push({text :" ",height:20});
	    rowG.push({text :" ",height:20});
	    rowG.push({text :" ",height:20});
	    rowG.push({text :" ",height:20});
	    rowG.push({text :" ",height:20});
	    rowG.push({text :" ",height:20});
	    rowG.push({text :" ",height:20});
	    partGBody.push(rowG);
	    
	    //Sub Grid Headers
	    colGSubGrid = new Array();
    	colGSubGrid.push({text: bundle_lbl_srNo, style:'subtableHeader'});
		colGSubGrid.push({text: 'TANs', style:'subtableHeader'});
    	colGSubGrid.push({text: lbl_shortPay, style:'subtableHeader'});
		if(assYrSelVal>='2023'){
			colGSubGrid.push({text: 'Short Deduction/Collection', style: 'subtableHeader'});
		}
		else
			colGSubGrid.push({text: lbl_shortDeduction, style: 'subtableHeader'});
		if(assYrSelVal>='2023'){
			colGSubGrid.push({text: 'Interest on  TDS/TCS Payments Default',style:'subtableHeader'});
		}
		else
			colGSubGrid.push({text: 'Interest on  TDS Payments Default',style:'subtableHeader'});
		if(assYrSelVal>='2023'){
			colGSubGrid.push({text: 'Interest on TDS/TCS Deduction/Collection Default',style:'subtableHeader'});
		}
    	else
			colGSubGrid.push({text: 'Interest on  TDS Deduction Default',style:'subtableHeader'});
    	colGSubGrid.push({text: lbl_late_flng_levy,style:'subtableHeader'});
    	colGSubGrid.push({text: lbl_intrst,style:'subtableHeader'});
    	colGSubGrid.push({text: lbl_partGTD,style:'subtableHeader'});
	    partGBody.push(colGSubGrid);
	 }else{
	 	pdfData.partGtxt.detG.forEach(function(partG){
		//Main Table Headers
		colGGrid = new Array();
		colGGrid.push({text: bundle_lbl_srNo, style:'tableHeader'});
		colGGrid.push({text: lbl_financialYear, style:'tableHeader'});
    	colGGrid.push({text: lbl_shortPay, style:'tableHeader'});
		if(assYrSelVal>='2023'){
			colGGrid.push({text: 'Short Deduction/Collection', style: 'tableHeader'});
		}
		else
			colGGrid.push({text: lbl_shortDeduction, style: 'tableHeader'});
		if(assYrSelVal>='2023'){
			colGGrid.push({text: 'Interest on  TDS/TCS Payments Default',style:'tableHeader',fontSize: 6});
		}
		else
			colGGrid.push({text: 'Interest on  TDS Payments Default',style:'tableHeader',fontSize: 6});
		if(assYrSelVal>='2023'){
			colGGrid.push({text: 'Interest on TDS/TCS Deduction/Collection Default',style:'tableHeader'});
		}
    	else
			colGGrid.push({text: 'Interest on  TDS Deduction Default',style:'tableHeader'});
    	colGGrid.push({text: lbl_late_flng_levy,style:'tableHeader'});
    	colGGrid.push({text: lbl_intrst,style:'tableHeader'});
    	colGGrid.push({text: lbl_partGTD,style:'tableHeader'});
		partGBody.push(colGGrid);
		
		//Main Table Data
		 rowG = new Array();
	    rowG.push({text:partG['1G'],style :'dataFieldStyle'});
	    rowG.push({text:partG['TG'],style :'dataFieldStyle'});
	    rowG.push({text:parseFloat(partG['3G']).toFixed(2),style :'amtFieldStyle'});
	    rowG.push({text:parseFloat(partG['4G']).toFixed(2),style :'amtFieldStyle'});
	    rowG.push({text:parseFloat(partG['5G']).toFixed(2),style :'amtFieldStyle'});
	    rowG.push({text:parseFloat(partG['6G']).toFixed(2),style :'amtFieldStyle'});
	    rowG.push({text:parseFloat(partG['7G']).toFixed(2),style :'amtFieldStyle'});
	    rowG.push({text:parseFloat(partG['8G']).toFixed(2),style :'amtFieldStyle'});
	    rowG.push({text:parseFloat(partG['9G']).toFixed(2),style :'amtFieldStyle'});
	    partGBody.push(rowG);    
	    
	    //Sub Grid Headers
	    colGSubGrid = new Array();
    	colGSubGrid.push({text: bundle_lbl_srNo, style:'subtableHeader'});
		colGSubGrid.push({text: 'TANs', style:'subtableHeader'});
    	colGSubGrid.push({text: lbl_shortPay, style:'subtableHeader'});
		if(assYrSelVal>='2023'){
			colGSubGrid.push({text: 'Short Deduction/Collection', style: 'subtableHeader'});
		}
		else
			colGSubGrid.push({text: lbl_shortDeduction, style: 'subtableHeader'});
		if(assYrSelVal>='2023'){
			colGSubGrid.push({text: 'Interest on  TDS/TCS Payments Default',style:'subtableHeader'});
		}
		else
			colGSubGrid.push({text: 'Interest on  TDS Payments Default',style:'subtableHeader'});
		if(assYrSelVal>='2023'){
			colGSubGrid.push({text: 'Interest on TDS/TCS Deduction/Collection Default',style:'subtableHeader'});
		}
    	else
			colGSubGrid.push({text: 'Interest on  TDS Deduction Default',style:'subtableHeader'});
    	colGSubGrid.push({text: lbl_late_flng_levy,style:'subtableHeader'});
    	colGSubGrid.push({text: lbl_intrst,style:'subtableHeader'});
    	colGSubGrid.push({text: lbl_partGTD,style:'subtableHeader'});
	    partGBody.push(colGSubGrid);
	    
	    subGridGData = eval('pdfData.partGtxt.fyG');	    
	    
	   subGridGData.forEach(function(subG){
	    subRowG = new Array();
		subRowG.push({text:subG['1G1'],style :'dataFieldStyle'});
		subRowG.push({text:subG['2G1'],style :'dataFieldStyle'});
		subRowG.push({text:parseFloat(subG['3G1']).toFixed(2),style :'amtFieldStyle'});
		subRowG.push({text:parseFloat(subG['4G1']).toFixed(2),style :'amtFieldStyle'});
		subRowG.push({text:parseFloat(subG['5G1']).toFixed(2),style :'amtFieldStyle'});
		subRowG.push({text:parseFloat(subG['6G1']).toFixed(2),style :'amtFieldStyle'});
		subRowG.push({text:parseFloat(subG['7G1']).toFixed(2),style :'amtFieldStyle'});
		subRowG.push({text:parseFloat(subG['8G1']).toFixed(2),style :'amtFieldStyle'});
		subRowG.push({text:parseFloat(subG['9G1']).toFixed(2),style :'amtFieldStyle'}); 
		partGBody.push(subRowG);		
	   });  
	});	
	} 
		/**********************Part G: Ends****************/
		
	/*****************************Part H : Start*************************************************/ 
		//Main Table Headers
	if (pdfData.partHtxt.detH.length == 0){
		colHGrid = new Array();
		colHGrid.push({text: bundle_lbl_srNo, style:'tableHeader'});
		colHGrid.push({text: lbl_partH_GSTIN, style:'tableHeader'});
	    colHGrid.push({text: lbl_partH_ARN, style: 'tableHeader'});
	    colHGrid.push({text: lbl_partH_DtofFil, style: 'tableHeader'});
	    colHGrid.push({text: lbl_partH_RtnPrd, style: 'tableHeader'});
	    colHGrid.push({text: lbl_partH_TxblTrnvr,style:'tableHeader'});
	    colHGrid.push({text: lbl_partH_TotTrnvr,style:'tableHeader'});
		partHBody.push(colHGrid);
		 
	}
	else{
	   	colHGrid = new Array();
		colHGrid.push({text: bundle_lbl_srNo, style:'tableHeader'});
		colHGrid.push({text: lbl_partH_GSTIN, style:'tableHeader'});
	    colHGrid.push({text: lbl_partH_ARN, style: 'tableHeader'});
	    colHGrid.push({text: lbl_partH_DtofFil, style: 'tableHeader'});
	    colHGrid.push({text: lbl_partH_RtnPrd, style: 'tableHeader'});
	    colHGrid.push({text: lbl_partH_TxblTrnvr,style:'tableHeader'});
	    colHGrid.push({text: lbl_partH_TotTrnvr,style:'tableHeader'});
		partHBody.push(colHGrid);
			
		//Main Table Data
		pdfData.partHtxt.detH.forEach(function(partH){
			rowH = new Array();
		    rowH.push({text:partH['H1'],style :'dataFieldStyle'});
		    rowH.push({text:partH['H2'],style :'dataFieldStyle'});
			rowH.push({text:partH['H3'],style :'dataFieldStyle'});
		    rowH.push({text:partH['H4'],style :'dataFieldStyle'});
		    rowH.push({text:partH['H5'],style :'dataFieldStyle'});
			rowH.push({text:parseFloat(partH['H6']).toFixed(2),style :'amtFieldStyle'});
			rowH.push({text:parseFloat(partH['H7']).toFixed(2),style :'amtFieldStyle'}); 
		    partHBody.push(rowH); 
		});  
	}
	 
		/****** Contact Information Table ******/
		
		colContactGrid = new Array();
			if(assYrSelVal>'2020'){	
				colContactGrid.push({text: 'Part of Annual Tax Statement', style:'tableHeader'});
			}else{
			colContactGrid.push({text: 'Part of Form 26AS', style:'tableHeader'});
			}
	    	colContactGrid.push({text: 'Contact in case of any clarification', style:'tableHeader'});
			ContactInfoBody.push(colContactGrid);
			
		 	   //Main Table Data
		 	if(assYrSelVal>='2023'){
				ContactInfoRow = new Array();
				ContactInfoRow.push({text: 'I',alignment: 'center'});
				ContactInfoRow.push({text: 'Deductor'});
				ContactInfoBody.push(ContactInfoRow);  
				ContactInfoRow = new Array();
				ContactInfoRow.push({text: 'II',alignment: 'center'});
				ContactInfoRow.push({text: 'Deductor'});
				ContactInfoBody.push(ContactInfoRow);
				ContactInfoRow = new Array();
				ContactInfoRow.push({text: 'III',alignment: 'center'});
				ContactInfoRow.push({text: 'Deductor'});
				ContactInfoBody.push(ContactInfoRow);  
				ContactInfoRow = new Array();
				ContactInfoRow.push({text: 'IV',alignment: 'center'});
				ContactInfoRow.push({text: 'Deductor'});
				ContactInfoBody.push(ContactInfoRow);  
				ContactInfoRow = new Array();
				ContactInfoRow.push({text: 'V',alignment: 'center'});
				ContactInfoRow.push({text: 'Buyer'});
				ContactInfoBody.push(ContactInfoRow);  
				ContactInfoRow = new Array();
				ContactInfoRow.push({text: 'VI',alignment: 'center'});
				ContactInfoRow.push({text: 'Collector'});
				ContactInfoBody.push(ContactInfoRow);  
				ContactInfoRow = new Array();
				ContactInfoRow.push({text: 'VII',alignment: 'center'});
				ContactInfoRow.push({text: 'Assessing Officer / Bank'});
				ContactInfoBody.push(ContactInfoRow);  
				ContactInfoRow = new Array();
				ContactInfoRow.push({text: 'VIII',alignment: 'center'});
				ContactInfoRow.push({text: 'NSDL / E-Filing/ Concerned Bank Branch'});
				ContactInfoBody.push(ContactInfoRow);
				ContactInfoRow = new Array();
				ContactInfoRow.push({text: 'IX',alignment: 'center'});
				ContactInfoRow.push({text: 'E-Filing/ Concerned Bank Branch/Seller'});
				ContactInfoBody.push(ContactInfoRow);  
				ContactInfoRow = new Array();
				ContactInfoRow.push({text: 'X',alignment: 'center'});
				ContactInfoRow.push({text: 'Deductor'});
				ContactInfoBody.push(ContactInfoRow); 
		    
			}else{
				ContactInfoRow = new Array();
				ContactInfoRow.push({text: 'A',alignment: 'center'});
				ContactInfoRow.push({text: 'Deductor'});
				ContactInfoBody.push(ContactInfoRow);  
				ContactInfoRow = new Array();
				ContactInfoRow.push({text: 'A1',alignment: 'center'});
				ContactInfoRow.push({text: 'Deductor'});
				ContactInfoBody.push(ContactInfoRow);
				ContactInfoRow = new Array();
				ContactInfoRow.push({text: 'A2',alignment: 'center'});
				ContactInfoRow.push({text: 'Deductor'});
				ContactInfoBody.push(ContactInfoRow);  
				ContactInfoRow = new Array();
				ContactInfoRow.push({text: 'B',alignment: 'center'});
				ContactInfoRow.push({text: 'Collector'});
				ContactInfoBody.push(ContactInfoRow);  
				ContactInfoRow = new Array();
				ContactInfoRow.push({text: 'C',alignment: 'center'});
				ContactInfoRow.push({text: 'Assessing Officer / Bank'});
				ContactInfoBody.push(ContactInfoRow);  
				ContactInfoRow = new Array();
				ContactInfoRow.push({text: 'D',alignment: 'center'});
				ContactInfoRow.push({text: 'Assessing Officer / ITR-CPC'});
				ContactInfoBody.push(ContactInfoRow);  
				ContactInfoRow = new Array();
				ContactInfoRow.push({text: 'E',alignment: 'center'});
				ContactInfoRow.push({text: 'Concerned AIR Filer/SFT Filer'});
				ContactInfoBody.push(ContactInfoRow);  
				ContactInfoRow = new Array();
				ContactInfoRow.push({text: 'F',alignment: 'center'});
				ContactInfoRow.push({text: 'NSDL / Concerned Bank Branch'});
				ContactInfoBody.push(ContactInfoRow); 
				ContactInfoRow = new Array();
				ContactInfoRow.push({text: 'G',alignment: 'center'});
				ContactInfoRow.push({text: 'Deductor'});
				ContactInfoBody.push(ContactInfoRow);         
				if(assYrSelVal>'2019'){			
					ContactInfoRow = new Array();
					ContactInfoRow.push({text: 'H',alignment: 'center'});
					ContactInfoRow.push({text: 'GSTN'});
					ContactInfoBody.push(ContactInfoRow); 
				} 
		    }
		    
		    /****** Legends Table ******/
		
		legendsGrid = new Array();
			legendsGrid.push({text: 'Legend', style:'tableHeader'});
			legendsGrid.push({text: 'Description', style:'tableHeader'});
			legendsGrid.push({text: 'Definition', style:'tableHeader'});
			legendsBody.push(legendsGrid);
			
		 	   //Main Table Data
		 	 
			 
			if(assYrSelVal>='2023'){	
				legendsRow = new Array();
				legendsRow.push({text: 'U',alignment: 'center'});
				legendsRow.push({text: 'Unmatched'});
				legendsRow.push({text: 'Deductors have not deposited taxes or have furnished incorrect particulars of tax payment. Final credit will be reflected only when payment details in bank match with details of deposit in TDS / TCS statement'});
				legendsBody.push(legendsRow); 				
				legendsRow = new Array();
				legendsRow.push({text: 'M',alignment: 'center'});
				legendsRow.push({text: 'Matched'});
				legendsRow.push({text: 'Particulars of challan details provided in TDS statement have matched with the challan details available in OLTAS'});
				legendsBody.push(legendsRow);
			} else{
				legendsRow = new Array();
				legendsRow.push({text: 'U',alignment: 'center'});
				legendsRow.push({text: 'Unmatched'});
				legendsRow.push({text: 'Deductors have not deposited taxes or have furnished incorrect particulars of tax payment in the TDS/TCS statement'});
				legendsBody.push(legendsRow); 
			}
		      
			
			 
		    legendsRow = new Array();
		    legendsRow.push({text: 'P',alignment: 'center'});
		    legendsRow.push({text: 'Provisional'});
		    legendsRow.push({text: 'Provisional tax credit is effected only for TDS / TCS Statements filed by Government deductors."P" status will be changed to Final (F) on verification of payment details submitted by Pay and Accounts Officer (PAO)'});
		    legendsBody.push(legendsRow); 
		    legendsRow = new Array();
		     legendsRow.push({text: 'F',alignment: 'center'});
		     legendsRow.push({text: 'Final'});
		     legendsRow.push({text: 'In case of non-government deductors, payment details of TDS / TCS deposited in bank by deductors have matched with the payment details mentioned in the TDS / TCS statement filed by the deductors. In case of government deductors, details of TDS / TCS booked in Government account have been verified with payment details submitted by Pay and Accounts Officer (PAO)'});
	 		legendsBody.push(legendsRow);
	 		legendsRow = new Array();
		    legendsRow.push({text: 'O',alignment: 'center'});
		    legendsRow.push({text: 'Overbooked'});
		    legendsRow.push({text: 'Payment details of TDS / TCS deposited in bank by deductor have matched with details mentioned in the TDS / TCS statement but the amount is over claimed in the statement. Final (F) credit will be reflected only when deductor reduces claimed amount in the statement or makes additional payment for excess amount claimed in the statement'});
	 		legendsBody.push(legendsRow); 
			if(assYrSelVal>='2023'){	
				legendsRow = new Array();
				legendsRow.push({text: 'Z',alignment: 'center'});
				legendsRow.push({text: 'Mismatch'});
				legendsRow.push({text: 'Particulars of challan details provided in TDS statement have not matched with the challan details available in OLTAS. Status of challan will be updated as "M" (Matched), once correction is done by the deductor.'});
				legendsBody.push(legendsRow);
			}
	 		
	 		
	 		/***** Legends Description Table ****/
	 		
	 		/****** Legends Table ******/
		
		legendsDescGrid = new Array();
			legendsDescGrid.push({text: 'Legend', style:'tableHeader'});
			legendsDescGrid.push({text: 'Description', style:'tableHeader'});
			legendsDescBody.push(legendsDescGrid);
			
		 	   //Main Table Data
		 	 
			 legendsDescRow = new Array();
		    legendsDescRow.push({text: "'A'",alignment: 'center'});
		    legendsDescRow.push({text: 'Rectification of error in challan uploaded by bank'});
		     legendsDescBody.push(legendsDescRow); 
		     legendsDescRow = new Array();
		    legendsDescRow.push({text: "'B'",alignment: 'center'});
		    legendsDescRow.push({text: 'Rectification of error in statement uploaded by deductor'});
		     legendsDescBody.push(legendsDescRow);  
			 if(assYrSelVal < '2023'){
				legendsDescRow = new Array();
				legendsDescRow.push({text: "'C'",alignment: 'center'});
				legendsDescRow.push({text: 'Correction/Rectification of error in Statement uploaded by SFT Filer'});
				legendsDescBody.push(legendsDescRow); 
			}
		     legendsDescRow = new Array();
		    legendsDescRow.push({text: "'D'",alignment: 'center'});
		    legendsDescRow.push({text: 'Rectification of error in Form 24G filed by Accounts Officer'});
		     legendsDescBody.push(legendsDescRow);  
		     legendsDescRow = new Array();
		    legendsDescRow.push({text: "'E'",alignment: 'center'});
		    legendsDescRow.push({text: 'Rectification of error in Challan by Assessing Officer'});
		     legendsDescBody.push(legendsDescRow);  
		     legendsDescRow = new Array();
		    legendsDescRow.push({text: "'F'",alignment: 'center'});
		    legendsDescRow.push({text: 'Lower/ No deduction certificate u/s 197'});
		     legendsDescBody.push(legendsDescRow);
		     legendsDescRow = new Array();
		     legendsDescRow.push({text: "'G'",alignment: 'center'});
		    legendsDescRow.push({text: 'Reprocessing of Statement'});
		     legendsDescBody.push(legendsDescRow);    
		    if(assYrSelVal < '2023'){
				legendsDescRow = new Array();
				legendsDescRow.push({text: "'O'",alignment: 'center'});
				legendsDescRow.push({text: 'Original Statement uploaded by SFT Filer'});
				legendsDescBody.push(legendsDescRow); 
				legendsDescRow = new Array();
				legendsDescRow.push({text: "'R'",alignment: 'center'});
				legendsDescRow.push({text: 'Reversal of Entry in Original/Correction Statement uploaded by SFT Filer'});
				legendsDescBody.push(legendsDescRow); 
			}
		     legendsDescRow = new Array();
		    legendsDescRow.push({text: "'T'",alignment: 'center'});
		    legendsDescRow.push({text: 'Transporter'});
		     legendsDescBody.push(legendsDescRow); 
		    if(assYrSelVal>='2023'){
				legendsDescRow = new Array();
				legendsDescRow.push({text: "'W'",alignment: 'center'});
				legendsDescRow.push({text: 'For Part III, Details shown are as per details submitted by Deductor'});
				legendsDescBody.push(legendsDescRow);
		    }
		    
		    
		   
	 		
	 		
	 		/********** Type Of transaction ******************/
	 		
	 		typeOfTransGrid = new Array();
			typeOfTransGrid.push({text: 'Code', style:'tableHeader'});
			typeOfTransGrid.push({text: 'Description', style:'tableHeader'});
			typeOfTransBody.push(typeOfTransGrid);
			
		 	   //Main Table Data
		 	   //CR459-SFT Changes
		 	 if(assYrSelVal>'2016'){
				 	 	typeOfTransRow = new Array();
				    typeOfTransRow.push({text: 'SFT-001',alignment: 'center'});
				    typeOfTransRow.push({text: 'Payment made in cash for purchase of bank drafts or pay orders or banker\'s cheque of an amount aggregating to ten lakh rupees or more in a financial year.'});
				    typeOfTransBody.push(typeOfTransRow); 
				      typeOfTransRow = new Array();
				    typeOfTransRow.push({text: 'SFT-002',alignment: 'center'});
				    typeOfTransRow.push({text: 'Payments made in cash aggregating to ten lakh rupees or more during the financial year for purchase of pre-paid instruments issued by Reserve Bank of India under section 18 of the Payment and Settlement Systems Act, 2007 (51 of 2007).'});
				     typeOfTransBody.push(typeOfTransRow); 
				      typeOfTransRow = new Array();
				    typeOfTransRow.push({text: 'SFT-003',alignment: 'center', rowSpan: 2});
				   typeOfTransRow.push({text: '03A - Cash deposits aggregating to fifty lakh rupees or more in a financial year, in or from one or more current account of a person.'});
				    typeOfTransBody.push(typeOfTransRow); 
				    typeOfTransRow = new Array();
				    typeOfTransRow.push("");
				    typeOfTransRow.push({text: '03B - Cash withdrawals (including through bearer\'s cheque) aggregating to fifty lakh rupees or more in a financial year, in or from one or more current account of a person.'});
				    typeOfTransBody.push(typeOfTransRow); 
				      typeOfTransRow = new Array();
				    typeOfTransRow.push({text: 'SFT-004',alignment: 'center'});
				    typeOfTransRow.push({text: 'Cash deposits aggregating to ten lakh rupees or more in a financial year, in one or more accounts (other than a current account and time deposit) of a person.'});
				    typeOfTransBody.push(typeOfTransRow); 
				      typeOfTransRow = new Array();
				    typeOfTransRow.push({text: 'SFT-005',alignment: 'center'});
				    typeOfTransRow.push({text: 'One or more time deposits (other than a time deposit made through renewal of another time deposit) of a person aggregating to ten lakh rupees or more in a financial year of a person.'});
				     typeOfTransBody.push(typeOfTransRow); 
				      typeOfTransRow = new Array();
				    typeOfTransRow.push({text: 'SFT-006',alignment: 'center'});
				    typeOfTransRow.push({text: 'Payments made by any person of an amount aggregating to- (i) One lakh rupees or more in cash; or (ii) Ten lakh rupees or more by any other mode, against bills raised in respect of one or more credit cards issued to that person, in a financial year.'});
				     typeOfTransBody.push(typeOfTransRow); 
				      typeOfTransRow = new Array();
				    typeOfTransRow.push({text: 'SFT-007',alignment: 'center'});
				    typeOfTransRow.push({text: 'Receipt from any person of an amount aggregating to ten lakh rupees or more in a financial year for acquiring bonds or debentures issued by the company or institution (other than the amount received on account of renewal of the bond or debenture issued by that company).'});
				     typeOfTransBody.push(typeOfTransRow); 
				      typeOfTransRow = new Array();
				    typeOfTransRow.push({text: 'SFT-008',alignment: 'center'});
				    typeOfTransRow.push({text: 'Receipt from any person of an amount aggregating to ten lakh rupees or more in a financial year for acquiring shares (including share application money) issued by the company.'});
				     typeOfTransBody.push(typeOfTransRow);
					typeOfTransRow = new Array();
				    typeOfTransRow.push({text: 'SFT-009',alignment: 'center'});
				    typeOfTransRow.push({text: 'Buy back of shares from any person (other than the shares bought in the open market) for an amount or value aggregating to ten lakh rupees or more in a financial year.'});
				     typeOfTransBody.push(typeOfTransRow);
					typeOfTransRow = new Array();
				    typeOfTransRow.push({text: 'SFT-010',alignment: 'center'});
				    typeOfTransRow.push({text: 'Receipt from any person of an amount aggregating to ten lakh rupees or more in a financial year for acquiring units of one or more schemes of a Mutual Fund (other than the amount received on account of transfer from one scheme to another scheme of that Mutual Fund).'});
				     typeOfTransBody.push(typeOfTransRow);
					typeOfTransRow = new Array();
				    typeOfTransRow.push({text: 'SFT-011',alignment: 'center'});
				    typeOfTransRow.push({text: 'Receipt from any person for sale of foreign currency including any credit of such currency to foreign exchange card or expense in such currency through a debit or credit card or through issue of travellers cheque or draft or any other instrument of an amount aggregating to ten lakh rupees or more during a financial year.'});
				      typeOfTransBody.push(typeOfTransRow); 	
					typeOfTransRow = new Array();
				    typeOfTransRow.push({text: 'SFT-012',alignment: 'center'});
				    typeOfTransRow.push({text: 'Purchase or sale by any person of immovable property for an amount of thirty lakh rupees or more or valued by the stamp valuation authority referred to in section 50C of the Act at thirty lakh rupees or more.'});
				      typeOfTransBody.push(typeOfTransRow);
					typeOfTransRow = new Array();
				    typeOfTransRow.push({text: 'SFT-013',alignment: 'center'});
				    typeOfTransRow.push({text: 'Receipt of cash payment exceeding two lakh rupees for sale, by any person, of goods or services of any nature (other than those specified at Sl. Nos. 1 to 10 of Rule 114E)'});
				     typeOfTransBody.push(typeOfTransRow);
					typeOfTransRow = new Array();
				    typeOfTransRow.push({text: 'SFT-014',alignment: 'center'});
				    typeOfTransRow.push({text: 'Cash deposits during the period 09th November, 2016 to 30th December, 2016 aggregating to (i) twelve lakh fifty thousand rupees or more, in one or more current account of a person; or (ii) two lakh fifty thousand rupees or more, in one or more accounts (other than a current account) of a person. Cash deposits during the period 1st April, 2016 to 9th November, 2016 in respect of accounts that are reportable.'});
				     typeOfTransBody.push(typeOfTransRow); 			 
		 	 }else{ 
						 typeOfTransRow = new Array();
					    typeOfTransRow.push({text: '001*',alignment: 'center'});
					    typeOfTransRow.push({text: 'Cash deposits aggregating to ten lakh rupees or more in a year in any savings account of a person maintained in a banking company to which the Banking'});
					     typeOfTransBody.push(typeOfTransRow); 
					      typeOfTransRow = new Array();
					    typeOfTransRow.push({text: '002*',alignment: 'center'});
					    typeOfTransRow.push({text: 'Payment made by any person against bills raised in respect of a credit card aggregating to two lakh rupees or more in a year.'});
					     typeOfTransBody.push(typeOfTransRow); 
					      typeOfTransRow = new Array();
					    typeOfTransRow.push({text: '003',alignment: 'center'});
					    typeOfTransRow.push({text: 'Receipt from any person of an amount of two lakh rupees or more for purchase of units of a Mutual Fund.'});
					     typeOfTransBody.push(typeOfTransRow); 
					      typeOfTransRow = new Array();
					    typeOfTransRow.push({text: '004',alignment: 'center'});
					    typeOfTransRow.push({text: 'Receipt from any person of an amount of five lakh rupees or more for acquiring bonds or debentures issued by a company or institution.'});
					     typeOfTransBody.push(typeOfTransRow); 
					      typeOfTransRow = new Array();
					    typeOfTransRow.push({text: '005',alignment: 'center'});
					    typeOfTransRow.push({text: 'Receipt from any person of an amount of one lakh rupees or more for acquiring shares issued by a company.'});
					     typeOfTransBody.push(typeOfTransRow); 
					      typeOfTransRow = new Array();
					    typeOfTransRow.push({text: '006*',alignment: 'center'});
					    typeOfTransRow.push({text: 'Purchase by any person of immovable property valued at thirty lakh rupees or more'});
					     typeOfTransBody.push(typeOfTransRow); 
					      typeOfTransRow = new Array();
					    typeOfTransRow.push({text: '007*',alignment: 'center'});
					    typeOfTransRow.push({text: 'Sale by any person of immovable property valued at thirty lakh rupees or more.'});
					     typeOfTransBody.push(typeOfTransRow); 
					      typeOfTransRow = new Array();
					    typeOfTransRow.push({text: '008',alignment: 'center'});
					    typeOfTransRow.push({text: 'Receipt from any person of an amount of five lakh rupees or more in a year for investment in bonds issued by Reserve Bank of India.'});
					     typeOfTransBody.push(typeOfTransRow); 
				 		
	 		}
	 		
	 		 /****** Sections First Table ******/
		
		sections1Grid = new Array();
			sections1Grid.push({text: 'Section', style:'tableHeader'});
			sections1Grid.push({text: 'Description', style:'tableHeader'});
			sections1Body.push(sections1Grid);
			
		 	    //Main Table Data
		 	 
			 sections1Row = new Array();
		   sections1Row.push({text: '192'});
		    sections1Row.push({text: 'Salary'});
		     sections1Body.push(sections1Row);
		      sections1Row = new Array();
		   sections1Row.push({text: '192A'});
		    sections1Row.push({text: 'TDS on PF withdrawal'});
		     sections1Body.push(sections1Row);
		      sections1Row = new Array();
		   sections1Row.push({text: '193'});
		    sections1Row.push({text: 'Interest on Securities'});
		     sections1Body.push(sections1Row);
		      sections1Row = new Array();
		   sections1Row.push({text: '194'});
		    sections1Row.push({text: 'Dividends'});
		     sections1Body.push(sections1Row);
		      sections1Row = new Array();
		   sections1Row.push({text: '194A'});
		    sections1Row.push({text: "Interest other than 'Interest on securities'"});
		     sections1Body.push(sections1Row);
		      sections1Row = new Array();
		   sections1Row.push({text: '194B'});
		    sections1Row.push({text: 'Winning from lottery or crossword puzzle, etc'});
		     sections1Body.push(sections1Row);
		     if(assYrSelVal>='2024'){
		      sections1Row = new Array();
		   sections1Row.push({text: '194BA'});
		    sections1Row.push({text: 'Winnings from online games'});
		     sections1Body.push(sections1Row);
		     }
		      sections1Row = new Array();
		   sections1Row.push({text: '194BB'});
		    sections1Row.push({text: 'Winning from horse race'});
		     sections1Body.push(sections1Row);
		      sections1Row = new Array();
		   sections1Row.push({text: '194C'});
		    sections1Row.push({text: 'Payments to contractors and sub-contractors'});
		     sections1Body.push(sections1Row);
		      sections1Row = new Array();
		   sections1Row.push({text: '194D'});
		    sections1Row.push({text: 'Insurance commission'});
		     sections1Body.push(sections1Row);
		      sections1Row = new Array();
		   sections1Row.push({text: '194DA'});
		    sections1Row.push({text: 'Payment in respect of life insurance policy'});
		     sections1Body.push(sections1Row);
		     sections1Row = new Array();
		   sections1Row.push({text: '194E'});
		    sections1Row.push({text: 'Payments to non-resident sportsmen or sports associations'});
		     sections1Body.push(sections1Row);
		     sections1Row = new Array();
		   sections1Row.push({text: '194EE'});
		    sections1Row.push({text: 'Payments in respect of deposits under National Savings Scheme'});
		     sections1Body.push(sections1Row);
		     if(assYrSelVal=='2025'){
		     sections1Row = new Array();
		   sections1Row.push({text: '194F'});
		    sections1Row.push({text: 'Payments on account of repurchase of units by Mutual Fund or Unit Trust of India (omitted w.e.f. 01-oct-2024).'});
		     sections1Body.push(sections1Row);
		     }
		     else if(!(assYrSelVal>='2026')){
		     sections1Row = new Array();
		   sections1Row.push({text: '194F'});
		    sections1Row.push({text: 'Payments on account of repurchase of units by Mutual Fund or Unit Trust of India'});
		     sections1Body.push(sections1Row);
		     }
		     sections1Row = new Array();
		   sections1Row.push({text: '194G'});
		    sections1Row.push({text: 'Commission, price, etc. on sale of lottery tickets'});
		     sections1Body.push(sections1Row);
		     sections1Row = new Array();
		   sections1Row.push({text: '194H'});
		    sections1Row.push({text: 'Commission or brokerage'});
		     sections1Body.push(sections1Row);
		     //CR559 Adding sections
		     sections1Row = new Array();
		   sections1Row.push({text: '194I(a)'});
		    sections1Row.push({text: 'Rent on hiring of plant and machinery'});
		     sections1Body.push(sections1Row);
		     sections1Row = new Array();
		   sections1Row.push({text: '194I(b)'});
		    sections1Row.push({text: 'Rent on other than plant and machinery'});
		     sections1Body.push(sections1Row);
		     sections1Row = new Array();
		   sections1Row.push({text: '194IA'});
		    sections1Row.push({text: 'TDS on Sale of immovable property'});
		     sections1Body.push(sections1Row);
		     //CR559 Adding sections
		     sections1Row = new Array();
		   sections1Row.push({text: '194IB'});
		    sections1Row.push({text: 'Payment of rent by certain individuals or Hindu undivided family'});
		     sections1Body.push(sections1Row);
		     sections1Row = new Array();
		   sections1Row.push({text: '194IC'});
		    sections1Row.push({text: 'Payment under specified agreement'});
		     sections1Body.push(sections1Row);
		     if('2022' > assYrSelVal){
		     sections1Row = new Array();
		   sections1Row.push({text: '194J'});
		    sections1Row.push({text: 'Fees for professional or technical services'});
		     sections1Body.push(sections1Row);
		     }
		     if(assYrSelVal > '2020'){
		     sections1Row = new Array();
		   sections1Row.push({text: '194J(a)'});
		    sections1Row.push({text: 'Fees for technical services'});
		     sections1Body.push(sections1Row);
		     sections1Row = new Array();
		   sections1Row.push({text: '194J(b)'});
		    sections1Row.push({text: 'Fees for professional services or royalty etc'});
		     sections1Body.push(sections1Row);
		     }
		     
		     sections1Row = new Array();
		   sections1Row.push({text: '194K'});
		    sections1Row.push({text: 'Income payable to a resident assessee in respect of units of a specified mutual fund or of the units of the Unit Trust of India'});
		     sections1Body.push(sections1Row);
		     sections1Row = new Array();
		   sections1Row.push({text: '194LA'});
		    sections1Row.push({text: 'Payment of compensation on acquisition of certain immovable'});
		     sections1Body.push(sections1Row);
		     sections1Row = new Array();
		     sections1Row.push({text: '194LB'});
		    sections1Row.push({text: 'Income by way of Interest from Infrastructure Debt fund'});
		     sections1Body.push(sections1Row);
		     sections1Row = new Array();
		  
		     if(assYrSelVal>='2024'){
		        sections1Row = new Array();
				sections1Row.push({text: '194LC(2)(i) and (ia)'});
		   		sections1Row.push({text: 'Income under clause (i) and (ia) of sub-section (2) of section 194LC'});
		    	sections1Body.push(sections1Row);
		    	sections1Row = new Array();
				sections1Row.push({text: '194LC(2)(ib)'});
		   		sections1Row.push({text: 'Income under clause (ib) of sub-section (2) of section 194LC'});
		    	sections1Body.push(sections1Row);
		    	sections1Row = new Array();
				sections1Row.push({text: '194LC(2)(ic)'});
		   		sections1Row.push({text: 'Income under clause (ic) of sub-section (2) of section 194LC'});
		    	sections1Body.push(sections1Row);
		    	}else{
		    	 	sections1Row.push({text: '194LC'});
                	sections1Row.push({text: 'Income by way of interest from specified company payable to a non-resident'});
                	sections1Body.push(sections1Row);
		    	}
		     sections1Row = new Array();
		     sections1Row.push({text: '194LBA'});
		    sections1Row.push({text: 'Certain income from units of a business trust'});
		     sections1Body.push(sections1Row);
		     sections1Row = new Array();
		     sections1Row.push({text: '194LBB'});
		    sections1Row.push({text: 'Income in respect of units of investment fund'});
		     sections1Body.push(sections1Row);
		     sections1Row = new Array();
		     sections1Row.push({text: '194LBC'});
		    sections1Row.push({text: 'Income in respect of investment in securitization trust'});
		     sections1Body.push(sections1Row);
			 
			 if(assYrSelVal>='2023'){
				sections1Row = new Array();
				sections1Row.push({text: '194R'});
		   		sections1Row.push({text: 'Benefits or perquisites of business or profession'});
		    	sections1Body.push(sections1Row);
				
				sections1Row = new Array();
				sections1Row.push({text: '194S'});
		   		sections1Row.push({text: 'Payment of consideration for transfer of virtual digital asset by persons other than specified persons'});
		    	sections1Body.push(sections1Row);
		    	
		    	if(assYrSelVal>='2026'){
		    	sections1Row = new Array();
				sections1Row.push({text: '194T'});
		   		sections1Row.push({text: 'Payment of salary, remuneration, commission, bonus or interest to a partner of firm'});
		    	sections1Body.push(sections1Row);
				}
		    	
		    	sections1Row = new Array();
				sections1Row.push({text: 'Proviso to section 194B'});
		   		sections1Row.push({text: 'Winnings from lotteries and crossword puzzles, etc where consideration is made in kind or cash is not sufficient to meet the tax liability and tax has been paid before such winnings are released'});
		    	sections1Body.push(sections1Row);
		    	
		    	sections1Row = new Array();
				sections1Row.push({text: 'First Proviso to sub-section(1) of section 194R'});
		   		sections1Row.push({text: 'Benefits or perquisites of business or profession where such benefit is provided in kind or where part in cash is not sufficient to meet tax liability and tax required to be deducted is paid before such benefit is released'});
		    	sections1Body.push(sections1Row);
		    	
		    	sections1Row = new Array();
				sections1Row.push({text: 'Proviso to sub- section(1) of section 194S'});
		   		sections1Row.push({text: 'Payment for transfer of virtual digital asset where payment is in kind or in exchange of another virtual digital asset and tax required to be deducted is paid before such payment is released'});
		    	sections1Body.push(sections1Row);	
			
		    }
		      if(assYrSelVal>='2024'){
		    	sections1Row = new Array();
				sections1Row.push({text: 'Sub-section (2) of section 194BA'});
		   		sections1Row.push({text: 'Net Winnings from online games where the net winnings are made in kind or cash is not sufficient to meet the tax liability and tax has been paid before such net winnings are released'});
		    	sections1Body.push(sections1Row);
		    }
		     
		        
	 		
	 		
	 		
	 		/****** Sections second Table ******/
		
		sections2Grid = new Array();
			sections2Grid.push({text: 'Section', style:'tableHeader'});
			sections2Grid.push({text: 'Description', style:'tableHeader'});
			sections2Body.push(sections2Grid);
	 		
	 		//main table data
	 		
	 		sections2Row = new Array();
		   sections2Row.push({text: '194LD'});
		    sections2Row.push({text: 'TDS on interest on bonds / government securities'});
		     sections2Body.push(sections2Row);
		    
		     sections2Row = new Array();
		   sections2Row.push({text: '194M'});
		    sections2Row.push({text: 'Payment of certain sums by certain individuals or Hindu Undivided Family'});
		     sections2Body.push(sections2Row);
		     //CR559-Adding New Sections
		     sections2Row = new Array();
		   sections2Row.push({text: '194N'});
		    sections2Row.push({text: 'Payment of certain amounts in cash other than cases covered by first proviso or third proviso'});
		     sections2Body.push(sections2Row);
		     if(assYrSelVal>='2024'){
		     sections2Row = new Array();
				sections2Row.push({text: '194N First Proviso'});
		   		sections2Row.push({text: 'Payment of certain amounts in cash to non-filers except in case of co-operative societies'});
		    	sections2Body.push(sections2Row);
		    	sections2Row = new Array();
				sections2Row.push({text: '194N Third Proviso'});
		   		sections2Row.push({text: 'Payment of certain amounts in cash to co-operative societies not covered by first proviso'});
		    	sections2Body.push(sections2Row);
		    	sections2Row = new Array();
				sections2Row.push({text: '194N First Proviso read with Third Proviso'});
		   		sections2Row.push({text: 'Payment of certain amount in cash to non-filers being co-operative societies'});
		    	sections2Body.push(sections2Row);
		    	}
		     //CR 628 adding new Sections
		     if(assYrSelVal>'2020'){
		     sections2Row = new Array();
		   		sections2Row.push({text: '194O'});
		   		 sections2Row.push({text: 'Payment of certain sums by e-commerce operator to e-commerce participant'});
		    	 sections2Body.push(sections2Row);
		    	 }
		    	  if(assYrSelVal>'2021'){
		    	 sections2Row = new Array();
		   		sections2Row.push({text: '194P'});
		   	 	sections2Row.push({text: 'Deduction of tax in case of specified senior citizen'});
		     	sections2Body.push(sections2Row);
		     	sections2Row = new Array();
		   		sections2Row.push({text: '194Q'});
		   	 	sections2Row.push({text: 'Deduction of tax at source on payment of certain sum for purchase of goods'});
		     	sections2Body.push(sections2Row);
		     }
		     sections2Row = new Array();
		   sections2Row.push({text: '195'});
		    sections2Row.push({text: 'Other sums payable to a non-resident'});
		     sections2Body.push(sections2Row);
		     sections2Row = new Array();
		   sections2Row.push({text: '196A'});
		    sections2Row.push({text: 'Income in respect of units of non-residents'});
		     sections2Body.push(sections2Row);
		     sections2Row = new Array();
		   sections2Row.push({text: '196B'});
		    sections2Row.push({text: 'Payments in respect of units to an offshore fund'});
		     sections2Body.push(sections2Row);
		     sections2Row = new Array();
		   sections2Row.push({text: '196C'});
		    sections2Row.push({text: 'Income from foreign currency bonds or shares of Indian'});
		     sections2Body.push(sections2Row);
		     sections2Row = new Array();
		   sections2Row.push({text: '196D'});
		    sections2Row.push({text: 'Income of foreign institutional investors from securities'});
		     sections2Body.push(sections2Row);
		     //CR-628 changes for budget changes
		     if(assYrSelVal>'2020'){
		     sections2Row = new Array();
		   sections2Row.push({text: '196DA'});
		    sections2Row.push({text: 'Income of specified fund from securities '});
		     sections2Body.push(sections2Row);
		     }
		     sections2Row = new Array();
		   sections2Row.push({text: '206CA'});
		    sections2Row.push({text: 'Collection at source from alcoholic liquor for human'});
		     sections2Body.push(sections2Row);
		    if(assYrSelVal>='2026'){
		     sections2Row = new Array();
		   sections2Row.push({text: '206CB'});
		    sections2Row.push({text: 'Collection at source from Timber or any other forest produce (not being tendu leaves) obtained under a forest lease'});
		     sections2Body.push(sections2Row);
		     }else if(!(assYrSelVal>='2026')){
		     sections2Row = new Array();
		   sections2Row.push({text: '206CB'});
		    sections2Row.push({text: 'Collection at source from timber obtained under forest lease'});
		     sections2Body.push(sections2Row);
		     } 
		     sections2Row = new Array();
		   sections2Row.push({text: '206CC'});
		    sections2Row.push({text: 'Collection at source from timber obtained by any mode other than a forest lease'});
		     sections2Body.push(sections2Row);
		      if(!(assYrSelVal>='2026')){
		     sections2Row = new Array();
		   sections2Row.push({text: '206CD'});
		    sections2Row.push({text: 'Collection at source from any other forest produce (not being tendu leaves)'});
		     sections2Body.push(sections2Row);
		     }
		     sections2Row = new Array();
		   sections2Row.push({text: '206CE'});
		    sections2Row.push({text: 'Collection at source from any scrap'});
		     sections2Body.push(sections2Row);
		     sections2Row = new Array();
		   sections2Row.push({text: '206CF'});
		    sections2Row.push({text: 'Collection at source from contractors or licensee or lease relating to parking lots'});
		     sections2Body.push(sections2Row);
		     sections2Row = new Array();
		   sections2Row.push({text: '206CG'});
		    sections2Row.push({text: 'Collection at source from contractors or licensee or lease relating to toll plaza'});
		     sections2Body.push(sections2Row);
		     sections2Row = new Array();
		   sections2Row.push({text: '206CH'});
		    sections2Row.push({text: 'Collection at source from contractors or licensee or lease relating to mine or quarry'});
		     sections2Body.push(sections2Row);
		     sections2Row = new Array();
		   sections2Row.push({text: '206CI'});
		    sections2Row.push({text: 'Collection at source from tendu Leaves'});
		     sections2Body.push(sections2Row);
		     sections2Row = new Array();
		   sections2Row.push({text: '206CJ'});
		    sections2Row.push({text: 'Collection at source from on sale of certain Minerals'});
		     sections2Body.push(sections2Row);
		     sections2Row = new Array();
		   sections2Row.push({text: '206CK'});
		    sections2Row.push({text: 'Collection at source on cash case of Bullion and Jewellery'});
		     sections2Body.push(sections2Row);
		     sections2Row = new Array();
		   sections2Row.push({text: '206CL'});
		    sections2Row.push({text: 'Collection at source on sale of Motor vehicle'});
		     sections2Body.push(sections2Row);
		     sections2Row = new Array();
		   sections2Row.push({text: '206CM'});
		    sections2Row.push({text: 'Collection at source on sale in cash of any goods(other than bullion/jewelry)'});
		     sections2Body.push(sections2Row);
		    if(assYrSelVal>='2026'){
		     sections2Row = new Array();
		   sections2Row.push({text: '206CMA'});
		    sections2Row.push({text: 'Collection at source on sale of wrist watch'});
		     sections2Body.push(sections2Row);
		      sections2Row = new Array();
		   sections2Row.push({text: '206CMB'});
		    sections2Row.push({text: 'Collection at source on sale of art piece such as antiques, painting, sculpture'});
		     sections2Body.push(sections2Row);
		      sections2Row = new Array();
		   sections2Row.push({text: '206CMC'});
		    sections2Row.push({text: 'Collection at source on sale of collectibles such as coin, stamp'});
		     sections2Body.push(sections2Row);
		      sections2Row = new Array();
		   sections2Row.push({text: '206CMD'});
		    sections2Row.push({text: 'Collection at source on sale of yacht, rowing boat, canoe, helicopter'});
		     sections2Body.push(sections2Row);
		      sections2Row = new Array();
		   sections2Row.push({text: '206CME'});
		    sections2Row.push({text: 'Collection at source on sale of pair of sunglasses'});
		     sections2Body.push(sections2Row);
		      sections2Row = new Array();
		   sections2Row.push({text: '206CMF'});
		    sections2Row.push({text: 'Collection at source on sale of bag such as handbag, purse'});
		     sections2Body.push(sections2Row);
		      sections2Row = new Array();
		   sections2Row.push({text: '206CMG'});
		    sections2Row.push({text: 'Collection at source on sale of pair of shoes'});
		     sections2Body.push(sections2Row);
		     sections2Row = new Array();
		   sections2Row.push({text: '206CMH'});
		    sections2Row.push({text: 'Collection at source on sale of sportswear and equipment such as golf kit, ski-wear'});
		     sections2Body.push(sections2Row);
		     sections2Row = new Array();
		   sections2Row.push({text: '206CMI'});
		    sections2Row.push({text: 'Collection at source on sale of pair of shoes'});
		     sections2Body.push(sections2Row);
		     sections2Row = new Array();
		   sections2Row.push({text: '206CMJ'});
		    sections2Row.push({text: 'Collection at source on sale of horse for horse racing in race clubs and horse for polo'});
		     sections2Body.push(sections2Row);
		     }
		     sections2Row = new Array();
		   sections2Row.push({text: '206CN'});
		    sections2Row.push({text: 'Collection at source on providing of any services(other than Chapter-XVII-B)'});
		     sections2Body.push(sections2Row);
			 if(assYrSelVal>'2020'){
				sections2Row = new Array();
				sections2Row.push({text: '206CO'});
				sections2Row.push({text: 'Collection at source on remittance under LRS for purchase of overseas tour program package'});
				sections2Body.push(sections2Row);
				sections2Row = new Array();
				sections2Row.push({text: '206CP'});
				sections2Row.push({text: 'Collection at source on remittance under LRS for educational loan taken from financial institution mentioned in section 80E'});
				sections2Body.push(sections2Row);
				sections2Row = new Array();
				sections2Row.push({text: '206CQ'});
				sections2Row.push({text: 'Collection at source on remittance under LRS for purpose other than for purchase of overseas tour package or for educational loan taken from financial institution'});
				sections2Body.push(sections2Row);
			  if(!(assYrSelVal>='2026')){
				sections2Row = new Array();
				sections2Row.push({text: '206CR'});
				sections2Row.push({text: 'Collection at source on sale of goods'});
				sections2Body.push(sections2Row);
			  }
			 }
			 //CR760 changes Start
				if(assYrSelVal>='2024'){
				sections2Row = new Array();
				sections2Row.push({text: '206CT'});
				sections2Row.push({text: 'Collection at source on remittance under LRS is for the purposes of education or medical treatment and not covered under Code P'});
				sections2Body.push(sections2Row);
				}
				
			      
		      
		      
		   /********** Minor Head Table ***************/
		
		minorHeadGrid = new Array();
		minorHeadGrid.push({text: 'Code', style:'tableHeader'});
		minorHeadGrid.push({text: 'Description', style:'tableHeader'});
		minorHeadBody.push(minorHeadGrid);
			
		if(assYrSelVal>='2023'){
	 		minorHeadRow = new Array();
		    minorHeadRow.push({text: '200'});
		    minorHeadRow.push({text: 'TDS/TCS'});
		    minorHeadBody.push(minorHeadRow); 
		    minorHeadRow = new Array();
		    minorHeadRow.push({text: '400'});
		    minorHeadRow.push({text: 'Tax on regular assessment'});
		    minorHeadBody.push(minorHeadRow);
		    minorHeadRow = new Array();
		    minorHeadRow.push({text: '800'});
		    minorHeadRow.push({text: 'TDS on sale of immovable property'});
		    minorHeadBody.push(minorHeadRow);
	 	} 
	 	else{
	 		minorHeadRow = new Array();
		    minorHeadRow.push({text: '100'});
		    minorHeadRow.push({text: 'Advance tax'});
		    minorHeadBody.push(minorHeadRow); 
		    minorHeadRow = new Array();
		    minorHeadRow.push({text: '102'});
		    minorHeadRow.push({text: 'Surtax'});
		    minorHeadBody.push(minorHeadRow);
		    minorHeadRow = new Array();
		    minorHeadRow.push({text: '106'});
		    minorHeadRow.push({text: 'Tax on distributed profit of domestic companies'});
		    minorHeadBody.push(minorHeadRow);
		    minorHeadRow = new Array();
		    minorHeadRow.push({text: '107'});
		    minorHeadRow.push({text: 'Tax on distributed income to unit holder'});
		    minorHeadBody.push(minorHeadRow);
		    minorHeadRow = new Array();
		    minorHeadRow.push({text: '300'});
		    minorHeadRow.push({text: 'Self Assessment Tax'});
		    minorHeadBody.push(minorHeadRow);
		    minorHeadRow = new Array();
		    minorHeadRow.push({text: '400'});
		    minorHeadRow.push({text: 'Tax on regular assessment'});
		    minorHeadBody.push(minorHeadRow);
		    minorHeadRow = new Array();
		    minorHeadRow.push({text: '800'});
		    minorHeadRow.push({text: 'TDS on sale of immovable property'});
		    minorHeadBody.push(minorHeadRow); 
		}
	 		
	 		
	 		
	 		/********** Major Head Table ***************/
		
		majorHeadGrid = new Array();
			majorHeadGrid.push({text: 'Code', style:'tableHeader'});
			majorHeadGrid.push({text: 'Description', style:'tableHeader'});
			majorHeadBody.push(majorHeadGrid);
	 		
	 		//main table data
	 		
	 	if(assYrSelVal>='2023'){
	 		majorHeadRow = new Array();
		    majorHeadRow.push({text: '0020'});
		    majorHeadRow.push({text: 'Corporation Tax'});
		    majorHeadBody.push(majorHeadRow); 
		    majorHeadRow = new Array();
		    majorHeadRow.push({text: '0021'});
		    majorHeadRow.push({text: 'Income Tax (other than companies)'});
		    majorHeadBody.push(majorHeadRow)
		}
		else{
	 		majorHeadRow = new Array();
		    majorHeadRow.push({text: '0020'});
		    majorHeadRow.push({text: 'Corporation Tax'});
		    majorHeadBody.push(majorHeadRow); 
		    majorHeadRow = new Array();
		    majorHeadRow.push({text: '0021'});
		    majorHeadRow.push({text: 'Income Tax (other than companies)'});
		    majorHeadBody.push(majorHeadRow);
		    majorHeadRow = new Array();
		    majorHeadRow.push({text: '0023'});
		    majorHeadRow.push({text: 'Hotel Receipt Tax'});
		    majorHeadBody.push(majorHeadRow); 
		    majorHeadRow = new Array();
		    majorHeadRow.push({text: '0024'});
		    majorHeadRow.push({text: 'Interest Tax'});
		    majorHeadBody.push(majorHeadRow); 
		    majorHeadRow = new Array();
		    majorHeadRow.push({text: '0026'});
		    majorHeadRow.push({text: 'Fringe Benefit Tax'});
		    majorHeadBody.push(majorHeadRow); 
		    majorHeadRow = new Array();
		    majorHeadRow.push({text: '0028'});
		    majorHeadRow.push({text: 'Expenditure Tax / Other Taxes'});
		    majorHeadBody.push(majorHeadRow); 
		    majorHeadRow = new Array();
		    majorHeadRow.push({text: '0031'});
		    majorHeadRow.push({text: 'Estate Duty'});
		    majorHeadBody.push(majorHeadRow);
		    majorHeadRow = new Array();
		    majorHeadRow.push({text: '0032'});
		    majorHeadRow.push({text: 'Wealth Tax'});
		    majorHeadBody.push(majorHeadRow);  
		    majorHeadRow = new Array();
		    majorHeadRow.push({text: '0033'});
		    majorHeadRow.push({text: 'Gift Tax'});
		    majorHeadBody.push(majorHeadRow);    
		}  
		       
		       
		       
		  /********** Glossary First Table ***************/
		
		 glossary1Grid = new Array();
			glossary1Grid.push({text: 'Abbreviation', style:'tableHeader'});
			glossary1Grid.push({text: 'Description', style:'tableHeader'});
			glossary1Body.push(glossary1Grid);
	 		
	 		//main table data
	 		
	 	if(assYrSelVal>='2023'){
	 		glossary1Row = new Array();
		    glossary1Row.push({text: 'AY',alignment: 'center'});
		    glossary1Row.push({text: 'Assessment Year'});
		    glossary1Body.push(glossary1Row);
	 	}else{
	 		glossary1Row = new Array();
		    glossary1Row.push({text: 'AIR',alignment: 'center'});
		    glossary1Row.push({text: 'Annual Information Return'});
		    glossary1Body.push(glossary1Row);  
		    glossary1Row = new Array();
		    glossary1Row.push({text: 'AY',alignment: 'center'});
		    glossary1Row.push({text: 'Assessment Year'});
		    glossary1Body.push(glossary1Row);    
		    glossary1Row = new Array();
		    glossary1Row.push({text: 'EC',alignment: 'center'});
		    glossary1Row.push({text: 'Education Cess'});
		    glossary1Body.push(glossary1Row); 
		    glossary1Row = new Array();   
		    glossary1Row.push({text: 'SFT',alignment: 'center'});
		    glossary1Row.push({text: 'Statement of Financial Transaction'});
		    glossary1Body.push(glossary1Row);    
		}  
		     
	 		 
	 		/********** Glossary Second Table ***************/
		
		 glossary2Grid = new Array();
			glossary2Grid.push({text: 'Abbreviation', style:'tableHeader'});
			glossary2Grid.push({text: 'Description', style:'tableHeader'});
			glossary2Body.push(glossary2Grid);
	 		
	 		//main table data
	 		
	 	if(assYrSelVal>='2023'){
	 		glossary2Row = new Array();
		    glossary2Row.push({text: 'TDS',alignment: 'center'});
		    glossary2Row.push({text: 'Tax Deducted at Source'});
		    glossary2Body.push(glossary2Row);  
		    glossary2Row = new Array();
		    glossary2Row.push({text: 'TCS',alignment: 'center'});
		    glossary2Row.push({text: 'Tax Collected at Source'});
			glossary2Body.push(glossary2Row); 
	 	}else{
	 		glossary2Row = new Array();
		    glossary2Row.push({text: 'TDS',alignment: 'center'});
		    glossary2Row.push({text: 'Tax Deducted at Source'});
		    glossary2Body.push(glossary2Row);  
		    glossary2Row = new Array();
		    glossary2Row.push({text: 'TCS',alignment: 'center'});
		    glossary2Row.push({text: 'Tax Collected at Source'});
		    glossary2Body.push(glossary2Row);  
			if(assYrSelVal>'2019'){		
				glossary2Row = new Array();
				glossary2Row.push({text: 'GSTIN',alignment: 'center'});
				glossary2Row.push({text: 'Goods and Services Tax Identification Number'});
				glossary2Body.push(glossary2Row); 
		    }
		}				
		var dd;	
		
	if(assYrSelVal == '2021'){	
		dd = {
			pageMargins: [10,25,20,20],//Left,Top, Right, Bottom
			pageOrientation: 'potrait',
			background :{image : getBase64ImgUrl('watermark'),width:441, height:350,margin:[50,250,50,50]},
			header : function(page){
				if(page!=1){
					return {
						columns :[
							{text:'Assessee PAN: '+document.getElementById("pan").innerHTML,fontSize: 7,alignment:'left'},
							{text:'Assessee Name: '+document.getElementById("dedPanName").innerText,fontSize: 7,alignment:'center'},
							{text:'Assessment Year: '+document.getElementById("assessYearSelectedVal").innerHTML,fontSize: 7,alignment:'right'},
						],
						margin : [20,5]
					};
				}
			},
			content: [
					{text:"Data updated till "+getFormattedDate() + "\n ",fontSize: 7,alignment:'right'},
					{columns: [
					{text :'', paddingRight:50},
					{image : getBase64ImgUrl('logo'),width:442, height:67,paddingRight:100},
					{text :'', paddingRight:100},
					{image : getBase64ImgUrl('emblem'),width:86, height:54}
					]},
					{text:'\nAnnual Tax Statement\n ',alignment: 'center',fontSize: 12,bold:true},
					
					{	style:'tableStyle',
						table: {
							widths : ['23%','10%','15%','14%','10%','7%','12%','7%'],
							body:[
								[{text: 'Permanent Account Number (PAN)', style:'tableHeader'},{text: document.getElementById("pan").innerHTML},
								{text: 'Current Status of PAN', style: 'tableHeader'},
								document.getElementById("inp").innerText=="Inoperative" ? 
								({columns:[{text:"Active and ",style:'txtFieldHeader2'},{text:" Inoperative",style:'txtFieldHeader'}]}):
								document.getElementById("panStatus").innerHTML=="Deleted and Inoperative" || document.getElementById("panStatus").innerHTML=="Deleted" || document.getElementById("panStatus").innerHTML=="Deactivated" ?
								({text: document.getElementById("panStatus").innerHTML,style:'txtFieldHeader'}):
								({text: document.getElementById("panStatus").innerHTML,style:'txtFieldHeader3'}),
								{text: 'Financial Year',style:'tableHeader'},{text: document.getElementById("financialYear").innerHTML},
								{text: 'Assessment Year',style:'tableHeader'},{text: document.getElementById("assessYearSelectedVal").innerHTML}
								],
								[{text: 'Name of Assessee', style:'tableHeader'},{text: document.getElementById("dedPanName").innerText,colSpan: 7},'','','','','',''
								],
								[{text: 'Address of Assessee', style:'tableHeader'},{text: document.getElementById("add1").innerText + "\n" + document.getElementById("add2").innerText,colSpan: 7},'','','','','',''
								]
							]
						},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text:'\n ',fontSize: 6},
					{ul:['Above data / Status of PAN is as per PAN details. For any changes in data as mentioned above, you may submit request for corrections\nRefer www.tinpan.proteantech.in / www.utiitsl.com for more details. In case of discrepancy in status of PAN please contact your Assessing Officer\n  ','Communication details for TRACES can be updated in ' +"'Profile'"+' section. However, these changes will not be updated in PAN database as mentioned above\n ','Note-: This ' +"'Annual Tax Statement'"+' may be treated as Form No. 26AS under section 203AA and second proviso to section 206C(5) and Rule 31AB for the period from April 01, 2020 to May 31, 2020.\n '],fontSize: 7},
					{text:'(All amount values are in INR)',fontSize: 6,alignment:'right',italics:true},
					{text:'PART A - Details of Tax Deducted at Source\n\n',style: 'headings'},
					{style:'tableStyle',
						table: {
							widths : ['5%','10%','12%','12%','11%','11%','13%','14%','12%'],
							body:partABody
						},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partabtxt.detA),fontSize: 7,alignment:'left'},
					/*******Part A1 changes*****/
					{ text: '\nPART A1 - Details of Tax Deducted at Source for 15G / 15H\n ',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['5%','13%','14%','13%','12%','16%','15%','12%'],
							//headerRows: 1,
							body:partA1Body
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partabtxt.detA1),fontSize: 7,alignment:'left'},
					/*******Part A2 changes*****/
					{ text: '\nPART A2 - Details of Tax Deducted at Source on Sale of Immovable Property u/s 194IA/ TDS on Rent of Property u/s 194IB / TDS on payment to resident contractors and professionals u/s 194M (For Seller/Landlord of Property/Payee of resident contractors and professionals)\n ',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['5%','13%','28%','13%','14%','14%','13%'],
							//headerRows: 1,
							body:partA2Body
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partA2txt.detA2),fontSize: 7,alignment:'left'},
					/*******Part B changes*****/
					{ text: '\nPART B - Details of Tax Collected at Source\n\n',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['5%','10%','11%','13%','11%','11%','13%','14%','12%'],
							//headerRows: 1,
							body:partBBody
						},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partabtxt.detB),fontSize: 7,alignment:'left'},
					/*******Part C changes*****/
				{ text: '\nPART C - Details of Tax Paid (other than TDS or TCS)\n ',style: 'headings'},
					{	style:'tableStyle',
						table: {
							//widths : ['4%','8%','8%','10%','9%','9%','6%','10%','7%','9%','10%','10%'],
							widths : ['4%','5%','5%','9%','8%','7%','7%','7%','7%','9%','7%','10%','6%','9%'],// CR 638 New Column changes
							//headerRows: 1,
							body:partCBody
						},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partctxt.detC),fontSize: 7,alignment:'left'},
					/*******Part D changes*****/
					{ text: '\nPart D - Details of Paid Refund\n ',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['4%','14%','9%','10%','12%','15%','12%','13%','11%'],
							//headerRows: 1,
							body:partDBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partdtxt.detD),fontSize: 7,alignment:'left'},
					/*******Part E changes*****/
					/*******Part E CR459 SFT changes*****/
					{ text: getPartEHeader(assYrSelVal),style: 'headings'},
				
				
					{	style:'tableStyle',
						table: {
							//widths: [assYrSelVal>2016? '\['4%','32%','34%','8%','0%','0%','18%','0%','4%'\]' : '\['4%','12%','34%','8%','11%','7%','11%','6%','7%'\]'],
							//widths: ['4%','12%','34%','8%','11%','7%','11%','6%','7%'],
							//headerRows: 1,
							body:partEBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partetxt.detE),fontSize: 7,alignment:'left'},
					/*** notes added****/
					{text: getPartENote(assYrSelVal),fontSize: 7,bold:true}, 
					/*******Part F changes*****/
					{ text: '\nPART F - Details of Tax Deducted at Source on Sale of Immovable Property u/s 194IA/ TDS on Rent of Property u/s 194IB /TDS on payment to resident contractors and professionals u/s 194M (For Buyer/Tenant of Property /Payer of resident contractors and professionals)\n ',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['4%','12%','27%','10%','10%','13%','12%','12%'],
							//headerRows: 1,
							body:partFBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partftxt.detF),fontSize: 7,alignment:'left'},
					/*******Part G changes*****/
					{ text: '\nPART G - TDS Defaults* (Processing of Statements)\n ',style: 'headings'},
					{text:'(All amount values are in INR)',fontSize: 6,alignment:'right',italics:true},
					{	style:'tableStyle',
						table: {
							widths : ['5%','12%','10%','10%','11%','14%','13%','12%','13%'],
							//headerRows: 1,
							body:partGBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partGtxt.detG),fontSize: 7,alignment:'left'},
					{text:'\n*Notes:\n',fontSize: 7,bold:true},
					{text:'\n1.Defaults relate to processing of statements and do not include demand raised by the respective Assessing Officers.\n',fontSize: 7,bold:true},
					{text:'\n2.For more details please log on to TRACES as taxpayer.\n',fontSize: 7,bold:true},
					
					/*******Part H - changes : STARTS *****/
					{ text: '\nPART H - Details of Turnover as per GSTR-3B\n ',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['5%','18%','26%','12%','13%','13%','13%'],
							//headerRows: 1,
							body:partHBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partHtxt.detH),fontSize: 7,alignment:'left'},
					{text:'\nNotes:-\n',fontSize: 7,bold:true},
					{text:'\n1. The GSTN data displayed above includes internal stock transfers as well.\n',fontSize: 7,bold:true},
					/*******Part H - changes : ENDS *****/
					{ text: '\nContact Information\n\n',fontSize: 8,underlined:true,bold:true,style:'underline'},
					{	style:'tableStyle',
						table: {
							widths : ['20%','20%'],
							//headerRows: 1,
							body:ContactInfoBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{ text: '\n\nLegends used in Annual Tax Statement\n',fontSize: 8,underlined:true,bold:true,style:'underline'},
					{ text: '\n*Status Of Booking\n\n',fontSize: 8,underlined:true,bold:true},
					{	style:'tableStyle',
						table: {
							widths : ['10%','20%','70%'],
							//headerRows: 1,
							body:legendsBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{ text: '\n**Remarks\n\n',fontSize: 8,underlined:true,bold:true},
					{	style:'tableStyle',
						table: {
							widths : ['10%','90%'],
							//headerRows: 1,
							body:legendsDescBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text:'\n# Total Tax Deducted includes TDS, Surcharge and Education Cess',fontSize: 7},
					{text:'## Tax Deducted includes TDS, Surcharge and Education Cess',fontSize: 7},
					{text:'+ Total Tax Collected includes TCS, Surcharge and Education Cess',fontSize: 7},
					{text:'++ Tax Collected includes TCS, Surcharge and Education Cess',fontSize: 7},
					{text:'*** Total TDS Deposited will not include the amount deposited as Fees and Interest',fontSize: 7},
					{text:'### Total Amount Deposited other than TDS includes the Fees , Interest and Other etc.',fontSize: 7},
					{ text: '\nNotes for Annual Tax Statement',fontSize: 8,underlined:true,bold:true,style:'underline'},
					{text:'\na. Figures in brackets represent reversal (negative) entries',fontSize: 7},
					{text:'b. In Part C, details of tax paid are displayed excluding TDS or TCS, payments related to Securities Transaction Tax and Banking Cash Transaction Tax',fontSize: 7},
					{text:'c. Tax Credits appearing in Part A, A1, A2 and B of the Annual Tax Statement are on the basis of details given by deductor in the TDS / TCS statement filed by them. The same should be verified before claiming tax credit and only the amount which pertains to you should be claimed',fontSize: 7},
					{text:'d. This statement is issued on behalf of the Income Tax Department. See Section 203AA and second provision to Section 206C(5) of the Income Tax Act, 1961 and Rule 31AB of Income Tax Rules, 1962',fontSize: 7},
					{text:'e. This statement does not include payments pertaining to Assessment Year (AY) other than the AY mentioned above and payments against penalties',fontSize: 7},
					{text:'f. Date is displayed in dd-MMM-yyyy format',fontSize: 7},
					{text:'g. Details of Tax Deducted at Source in Annual Tax Statement, for Form 15G/15H includes transactions for which declaration under section 197A has been Quoted',fontSize: 7},
					{ text: '\n1.Sections\n\n',fontSize: 8,underlined:true,bold:true},
					{
					columns: [
						{	style:'tableStyle',
							table: {
								widths : ['10%','89%'],
								//headerRows: 1,
								body:sections1Body
							},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
						},
						[
							{
								columns: [
									{	style:'tableStyle',
											table: {
												widths : ['10%','89%'],
												//headerRows: 1,
												body:sections2Body
											},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
									},
								]
							}
						]
					]
				},
			{ text: '\n2.Minor Head                                                                                                                       3.Major Head\n\n',fontSize: 8,underlined:true,bold:true},
				{
					columns: [
						{	style:'tableStyle',
							table: {
								widths : ['10%','89%'],
								//headerRows: 1,
								body:minorHeadBody
							},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
						},
						[
							{
								columns: [
									{	style:'tableStyle',
											table: {
												widths : ['10%','89%'],
												//headerRows: 1,
												body:majorHeadBody
											},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
									},
								]
							}
						]
					]
				},
					{ text: '\n4.Type of Transaction\n\n',fontSize: 8,underlined:true,bold:true},
					{	style:'tableStyle',
						table: {
							widths : ['10%','90%'],
							//headerRows: 1,
							body:typeOfTransBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{ text: '\nGlossary\n\n',fontSize: 8,underlined:true,bold:true},
					{
					columns: [
						{	style:'tableStyle',
							table: {
								widths : ['15%','84%'],
								//headerRows: 1,
								body:glossary1Body
							},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
						},
						[
							{
								columns: [
									{	style:'tableStyle',
											table: {
												widths : ['15%','84%'],
												//headerRows: 1,
												body:glossary2Body
											},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
									},
								]
							}
						]
					]
				},
			],
			styles: {
				tableStyle: {
					margin: [0,0,0,0],
					paddingLeft:0,
					paddingRight:0,
					fontSize: 7
				},
				tableHeader: {
					bold:true,
					fillColor:'#035b87',
					color:'white',
					fontSize: 7,
					alignment: 'center'
				},
				subtableHeader: {
				bold:true,
					fillColor:'#c5d9f1',
					alignment: 'center',
					fontSize: 7
				},
				headings: {
					margin: [0,0,0,0],
				bold:true,
					fontSize: 7,
					color:'#366092'
			},
			dataFieldStyle: {
					fontSize: 7,
					alignment: 'center'
			},
			amtFieldStyle: {
					fontSize: 7,
					alignment: 'right'
			},
			underline: {
				decoration:'underline'
			},
			amtFieldHeader: {
					bold:true,
					fillColor:'#035b87',
					color:'white',
					fontSize: 7,
					alignment: 'right'
			},
			txtFieldHeader: {
					color:'red',
					fontSize: 7,
					alignment: 'justified'
			},
			txtFieldHeader2: {
					alignment: 'left'
			},
			txtFieldHeader3: {
					alignment: 'center'
			}
			}
		}
	}else if(assYrSelVal >= '2023'){	
		dd = {
			pageMargins: [10,25,20,20],//Left,Top, Right, Bottom
			pageOrientation: 'potrait',
			background :{image : getBase64ImgUrl('watermark'),width:441, height:350,margin:[50,250,50,50]},
			header : function(page){
				if(page!=1){
					return {
						columns :[
							{text:'Assessee PAN: '+document.getElementById("pan").innerHTML,fontSize: 7,alignment:'left'},
							{text:'Assessee Name: '+document.getElementById("dedPanName").innerText,fontSize: 7,alignment:'center'},
							{text:'Assessment Year: '+document.getElementById("assessYearSelectedVal").innerHTML,fontSize: 7,alignment:'right'},
						],
						margin : [20,5]
					};
				}
			},
			content: [
					{text:"Data updated till "+getFormattedDate() + "\n ",fontSize: 7,alignment:'right'},
					{columns: [
					{text :'', paddingRight:50},
					{image : getBase64ImgUrl('logo'),width:442, height:67,paddingRight:100},
					{text :'', paddingRight:100},
					{image : getBase64ImgUrl('emblem'),width:86, height:54}
					]},
					{text:'\nAnnual Tax Statement\n ',alignment: 'center',fontSize: 12,bold:true},
					
					{	style:'tableStyle',
						table: {
							widths : ['23%','10%','15%','14%','10%','7%','12%','7%'],
							body:[
								[{text: 'Permanent Account Number (PAN)', style:'tableHeader'},{text: document.getElementById("pan").innerHTML},
								{text: 'Current Status of PAN', style: 'tableHeader'},
								document.getElementById("inp").innerText=="Inoperative" ? 
								({columns:[{text:"Active and ",style:'txtFieldHeader2'},{text:" Inoperative",style:'txtFieldHeader'}]}):
								document.getElementById("panStatus").innerHTML=="Deleted and Inoperative" || document.getElementById("panStatus").innerHTML=="Deleted" || document.getElementById("panStatus").innerHTML=="Deactivated" ?
								({text: document.getElementById("panStatus").innerHTML,style:'txtFieldHeader'}):
								({text: document.getElementById("panStatus").innerHTML,style:'txtFieldHeader3'}),
								
								{text: 'Financial Year',style:'tableHeader'},{text: document.getElementById("financialYear").innerHTML},
								{text: 'Assessment Year',style:'tableHeader'},{text: document.getElementById("assessYearSelectedVal").innerHTML}
								],
								[{text: 'Name of Assessee', style:'tableHeader'},{text: document.getElementById("dedPanName").innerText,colSpan: 7},'','','','','',''
								],
								[{text: 'Address of Assessee', style:'tableHeader'},{text: document.getElementById("add1").innerText + "\n" + document.getElementById("add2").innerText,colSpan: 7},'','','','','',''
								]
							]
						},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text:'\n ',fontSize: 6},
					{ul:['Above data / Status of PAN is as per PAN details. For any changes in data as mentioned above, you may submit request for corrections\nRefer www.tinpan.proteantech.in / www.utiitsl.com for more details. In case of discrepancy in status of PAN please contact your Assessing Officer '],fontSize: 7},
					{text:'(All amount values are in INR)',fontSize: 6,alignment:'right',italics:true},
					{text:'PART-I - Details of Tax Deducted at Source\n\n',style: 'headings'},
					{style:'tableStyle',
						table: {
							widths : ['5%','10%','12%','12%','11%','11%','13%','14%','12%'],
							body:partABody
						},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partabtxt.detA),fontSize: 7,alignment:'left'},
					/*******Part A1 changes*****/
					{ text: '\nPART-II-Details of Tax Deducted at Source for 15G / 15H\n ',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['5%','13%','14%','13%','12%','16%','15%','12%'],
							//headerRows: 1,
							body:partA1Body
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partabtxt.detA1),fontSize: 7,alignment:'left'},
					/*******Part III changes*****/
					(assYrSelVal >= '2024')? ({ text: '\nPART-III - Details of Transactions under Proviso to section 194B/First Proviso to sub-section (1) of section 194R/ Proviso to sub-section(1) of section 194S/Sub-section (2) of section 194BA\n ',style: 'headings'}):({ text:'\nPART-III - Details of Transactions under Proviso to section 194B/First Proviso to sub-section (1) of section 194R/ Proviso to sub-section(1) of section 194S\n ',style: 'headings'}),
					{	style:'tableStyle',
						table: {
							widths : ['5%','15%','26%','14%','14%','26%'],
							//headerRows: 1,
							body:partA3Body
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partabtxt.detA3),fontSize: 7,alignment:'left'},
					/*******Part A2 changes*****/
					{ text: '\nPART-IV -Details of Tax Deducted at Source u/s 194IA/ 194IB / 194M/ 194S (For Seller/Landlord of Property/Contractors or Professionals/ Seller of Virtual Digital Asset)\n ',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['6%','14%','13%','18%','10%','13%','14%','14%','11%'],
							//headerRows: 1,
							body:partA2Body
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partA2txt.detA2),fontSize: 7,alignment:'left'},
					/*******Part B changes*****/
					
					/******* Part V chnages CR743*************/
					{ text: '\nPART-V - Details of Transactions under Proviso to sub-section (1) of section 194S as per Form-26QE (For Seller of Virtual Digital Asset)\n ',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['5%','18%','18%','18%','10%','11%','22%','0%'],
							//headerRows: 1,
							body:partA5Body
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partVtxt.detPV),fontSize: 7,alignment:'left'},
					
					{ text: '\nPART-VI-Details of Tax Collected at Source\n\n',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['5%','10%','11%','13%','11%','11%','13%','14%','12%'],
							//headerRows: 1,
							body:partBBody
						},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partabtxt.detB),fontSize: 7,alignment:'left'},
				
					/*******Part D changes*****/
					{ text: '\nPART-VII- Details of Paid Refund (For which source is CPC TDS. For other details refer AIS at E-filing portal)\n ',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['4%','14%','9%','10%','12%','15%','12%','13%','11%'],
							//headerRows: 1,
							body:partDBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partdtxt.detD),fontSize: 7,alignment:'left'},
					/*******Part F changes*****/
					{ text: '\nPART-VIII-Details of Tax Deducted at Source u/s 194IA/ 194IB /194M/194S (For Buyer/Tenant of Property /Person making payment to contractors or Professionals / Buyer of Virtual Digital Asset)\n ',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['4%','12%','13%','14%','10%','10%','13%','12%','12%'],
							//headerRows: 1,
							body:partFBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partftxt.detF),fontSize: 7,alignment:'left'},
					
					/*******Part IX changes CR 743*****/
					{ text: '\nPART-IX - Details of Transactions/Demand Payments under Proviso to sub-section (1) of section 194S as per Form 26QE (For Buyer of Virtual Digital Asset)\n ',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['4%','12%','13%','14%','15%','13%','13%','18%','0%'],
							//headerRows: 1,
							body:partA9Body
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partIXtxt.detPIX),fontSize: 7,alignment:'left'},
					
					
					/*******Part G changes*****/
					
					{ text: '\nPART X-TDS/TCS Defaults* (Processing of Statements)\n ',style: 'headings'},
					{text:'(All amount values are in INR)',fontSize: 6,alignment:'right',italics:true},
					{	style:'tableStyle',
						table: {
							widths : ['5%','12%','10%','10%','11%','14%','13%','12%','13%'],
							//headerRows: 1,
							body:partGBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partGtxt.detG),fontSize: 7,alignment:'left'},
					{text:'\n*Notes:\n',fontSize: 7,bold:true},
					{text:'\n1.Defaults related to processing of statements, do not include demand raised by the respective Assessing Officers.\n',fontSize: 7,bold:true},
					{text:'\n2.For more details please log on to TRACES as taxpayer.\n',fontSize: 7,bold:true},
					
					
					{ text: '\nContact Information\n\n',fontSize: 8,underlined:true,bold:true,style:'underline'},
					{	style:'tableStyle',
						table: {
							widths : ['20%','20%'],
							//headerRows: 1,
							body:ContactInfoBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{ text: '\n\nLegends used in Annual Tax Statement\n',fontSize: 8,underlined:true,bold:true,style:'underline'},
					{ text: '\n*Status Of Booking\n\n',fontSize: 8,underlined:true,bold:true},
					{	style:'tableStyle',
						table: {
							widths : ['10%','20%','70%'],
							//headerRows: 1,
							body:legendsBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{ text: '\n**Remarks\n\n',fontSize: 8,underlined:true,bold:true},
					{	style:'tableStyle',
						table: {
							widths : ['10%','90%'],
							//headerRows: 1,
							body:legendsDescBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text:'\n# Total Tax Deducted includes TDS, Surcharge and Education Cess',fontSize: 7},
					{text:'## Tax Deducted includes TDS, Surcharge and Education Cess',fontSize: 7},
					{text:'+ Total Tax Collected includes TCS, Surcharge and Education Cess',fontSize: 7},
					{text:'++ Tax Collected includes TCS, Surcharge and Education Cess',fontSize: 7},
					{text:'*** Total TDS Deposited will not include the amount deposited as Fees and Interest',fontSize: 7},
					{text:'### "Total Amount Deposited other than TDS" includes Fees, Interest and Other etc.It also includes any default amount paid by deductor in case of Transactions covered under Proviso to sub-section (1) of section 194S',fontSize: 7},
					{ text: '\nNotes for Annual Tax Statement',fontSize: 8,underlined:true,bold:true,style:'underline'},
					{text:'\na. Figures in brackets represent reversal (negative) entries',fontSize: 7},
					{text:'b. Tax Credits appearing in Part I, II, IV and VI of the Annual Tax Statement are on the basis of details given by deductor/collector in the TDS / TCS statement filed by them. The same should be verified before claiming tax credit and only the amount which pertains to you should be claimed',fontSize: 7},
					{text:'c. Date is displayed in dd-MMM-yyyy format',fontSize: 7},
					{text:'d. Part II of Annual Tax Statement contains details of transactions related to Form 15G/15H furnished by the deductor in the TDS statement.',fontSize: 7},
					{ text: '\n1.Sections\n\n',fontSize: 8,underlined:true,bold:true},
					{
					columns: [
						{	style:'tableStyle',
							table: {
								widths : ['10%','89%'],
								//headerRows: 1,
								body:sections1Body
							},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
						},
						[
							{
								columns: [
									{	style:'tableStyle',
											table: {
												widths : ['10%','89%'],
												//headerRows: 1,
												body:sections2Body
											},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
									},
								]
							}
						]
					]
				},
			{ text: '\n2.Minor Head                                                                                                                       3.Major Head\n\n',fontSize: 8,underlined:true,bold:true},
				{
					columns: [
						{	style:'tableStyle',
							table: {
								widths : ['10%','89%'],
								//headerRows: 1,
								body:minorHeadBody
							},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
						},
						[
							{
								columns: [
									{	style:'tableStyle',
											table: {
												widths : ['10%','89%'],
												//headerRows: 1,
												body:majorHeadBody
											},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
									},
								]
							}
						]
					]
				},
					{ text: '\nGlossary\n\n',fontSize: 8,underlined:true,bold:true},
					{
					columns: [
						{	style:'tableStyle',
							table: {
								widths : ['15%','84%'],
								//headerRows: 1,
								body:glossary1Body
							},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
						},
						[
							{
								columns: [
									{	style:'tableStyle',
											table: {
												widths : ['15%','84%'],
												//headerRows: 1,
												body:glossary2Body
											},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
									},
								]
							}
						]
					]
				},
			],
			styles: {
				tableStyle: {
					margin: [0,0,0,0],
					paddingLeft:0,
					paddingRight:0,
					fontSize: 7
				},
				tableHeader: {
					bold:true,
					fillColor:'#035b87',
					color:'white',
					fontSize: 7,
					alignment: 'center'
				},
				subtableHeader: {
				bold:true,
					fillColor:'#c5d9f1',
					alignment: 'center',
					fontSize: 7
				},
				headings: {
					margin: [0,0,0,0],
				bold:true,
					fontSize: 7,
					color:'#366092'
			},
			dataFieldStyle: {
					fontSize: 7,
					alignment: 'center'
			},
			amtFieldStyle: {
					fontSize: 7,
					alignment: 'right'
			},
			underline: {
				decoration:'underline'
			},
			amtFieldHeader: {
					bold:true,
					fillColor:'#035b87',
					color:'white',
					fontSize: 7,
					alignment: 'right'
			},
			txtFieldHeader: {
					color:'red',
					fontSize: 7,
					alignment: 'justified'
			},
			txtFieldHeader2: {
					alignment: 'left'
			},
			txtFieldHeader3: {
					alignment: 'center'
			}
			}
		}
	}
	else if(assYrSelVal > '2021'){	
		dd = {
			pageMargins: [10,25,20,20],//Left,Top, Right, Bottom
			pageOrientation: 'potrait',
			background :{image : getBase64ImgUrl('watermark'),width:441, height:350,margin:[50,250,50,50]},
			header : function(page){
				if(page!=1){
					return {
						columns :[
							{text:'Assessee PAN: '+document.getElementById("pan").innerHTML,fontSize: 7,alignment:'left'},
							{text:'Assessee Name: '+document.getElementById("dedPanName").innerText,fontSize: 7,alignment:'center'},
							{text:'Assessment Year: '+document.getElementById("assessYearSelectedVal").innerHTML,fontSize: 7,alignment:'right'},
						],
						margin : [20,5]
					};
				}
			},
			content: [
					{text:"Data updated till "+getFormattedDate() + "\n ",fontSize: 7,alignment:'right'},
					{columns: [
					{text :'', paddingRight:50},
					{image : getBase64ImgUrl('logo'),width:442, height:67,paddingRight:100},
					{text :'', paddingRight:100},
					{image : getBase64ImgUrl('emblem'),width:86, height:54}
					]},
					{text:'\nAnnual Tax Statement\n ',alignment: 'center',fontSize: 12,bold:true},
					
					{	style:'tableStyle',
						table: {
							widths : ['23%','10%','15%','14%','10%','7%','12%','7%'],
							body:[
								[{text: 'Permanent Account Number (PAN)', style:'tableHeader'},{text: document.getElementById("pan").innerHTML},
								{text: 'Current Status of PAN', style: 'tableHeader'},
								document.getElementById("inp").innerText=="Inoperative" ? 
								({columns:[{text:"Active and ",style:'txtFieldHeader2'},{text:" Inoperative",style:'txtFieldHeader'}]}):
								document.getElementById("panStatus").innerHTML=="Deleted and Inoperative" || document.getElementById("panStatus").innerHTML=="Deleted" || document.getElementById("panStatus").innerHTML=="Deactivated" ?
								({text: document.getElementById("panStatus").innerHTML,style:'txtFieldHeader'}):
								({text: document.getElementById("panStatus").innerHTML,style:'txtFieldHeader3'}),
								{text: 'Financial Year',style:'tableHeader'},{text: document.getElementById("financialYear").innerHTML},
								{text: 'Assessment Year',style:'tableHeader'},{text: document.getElementById("assessYearSelectedVal").innerHTML}
								],
								[{text: 'Name of Assessee', style:'tableHeader'},{text: document.getElementById("dedPanName").innerText,colSpan: 7},'','','','','',''
								],
								[{text: 'Address of Assessee', style:'tableHeader'},{text: document.getElementById("add1").innerText + "\n" + document.getElementById("add2").innerText,colSpan: 7},'','','','','',''
								]
							]
						},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text:'\n ',fontSize: 6},
					{ul:['Above data / Status of PAN is as per PAN details. For any changes in data as mentioned above, you may submit request for corrections\nRefer www.tinpan.proteantech.in / www.utiitsl.com for more details. In case of discrepancy in status of PAN please contact your Assessing Officer\n  ','Communication details for TRACES can be updated in ' +"'Profile'"+' section. However, these changes will not be updated in PAN database as mentioned above\n '],fontSize: 7},
					{text:'(All amount values are in INR)',fontSize: 6,alignment:'right',italics:true},
					{text:'PART A - Details of Tax Deducted at Source\n\n',style: 'headings'},
					{style:'tableStyle',
						table: {
							widths : ['5%','10%','12%','12%','11%','11%','13%','14%','12%'],
							body:partABody
						},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partabtxt.detA),fontSize: 7,alignment:'left'},
					/*******Part A1 changes*****/
					{ text: '\nPART A1 - Details of Tax Deducted at Source for 15G / 15H\n ',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['5%','13%','14%','13%','12%','16%','15%','12%'],
							//headerRows: 1,
							body:partA1Body
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partabtxt.detA1),fontSize: 7,alignment:'left'},
					/*******Part A2 changes*****/
					{ text: '\nPART A2 - Details of Tax Deducted at Source on Sale of Immovable Property u/s 194IA/ TDS on Rent of Property u/s 194IB / TDS on payment to resident contractors and professionals u/s 194M (For Seller/Landlord of Property/Payee of resident contractors and professionals)\n ',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['5%','13%','28%','13%','14%','14%','13%'],
							//headerRows: 1,
							body:partA2Body
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partA2txt.detA2),fontSize: 7,alignment:'left'},
					/*******Part B changes*****/
					{ text: '\nPART B - Details of Tax Collected at Source\n\n',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['5%','10%','11%','13%','11%','11%','13%','14%','12%'],
							//headerRows: 1,
							body:partBBody
						},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partabtxt.detB),fontSize: 7,alignment:'left'},
					/*******Part C changes*****/
				{ text: '\nPART C - Details of Tax Paid (other than TDS or TCS)\n ',style: 'headings'},
					{	style:'tableStyle',
						table: {
							//widths : ['4%','8%','8%','10%','9%','9%','6%','10%','7%','9%','10%','10%'],
							widths : ['4%','5%','5%','9%','8%','7%','7%','7%','7%','9%','7%','10%','6%','9%'],// CR 638 New Column changes
							//headerRows: 1,
							body:partCBody
						},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partctxt.detC),fontSize: 7,alignment:'left'},
					/*******Part D changes*****/
					{ text: '\nPart D - Details of Paid Refund\n ',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['4%','14%','9%','10%','12%','15%','12%','13%','11%'],
							//headerRows: 1,
							body:partDBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partdtxt.detD),fontSize: 7,alignment:'left'},
					/*******Part E changes*****/
					/*******Part E CR459 SFT changes*****/
					{ text: getPartEHeader(assYrSelVal),style: 'headings'},
				
				
					{	style:'tableStyle',
						table: {
							//widths: [assYrSelVal>2016? '\['4%','32%','34%','8%','0%','0%','18%','0%','4%'\]' : '\['4%','12%','34%','8%','11%','7%','11%','6%','7%'\]'],
							//widths: ['4%','12%','34%','8%','11%','7%','11%','6%','7%'],
							//headerRows: 1,
							body:partEBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partetxt.detE),fontSize: 7,alignment:'left'},
					/*** notes added****/
					{text: getPartENote(assYrSelVal),fontSize: 7,bold:true}, 
					/*******Part F changes*****/
					{ text: '\nPART F - Details of Tax Deducted at Source on Sale of Immovable Property u/s 194IA/ TDS on Rent of Property u/s 194IB /TDS on payment to resident contractors and professionals u/s 194M (For Buyer/Tenant of Property /Payer of resident contractors and professionals)\n ',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['4%','12%','27%','10%','10%','13%','12%','12%'],
							//headerRows: 1,
							body:partFBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partftxt.detF),fontSize: 7,alignment:'left'},
					/*******Part G changes*****/
					{ text: '\nPART G - TDS Defaults* (Processing of Statements)\n ',style: 'headings'},
					{text:'(All amount values are in INR)',fontSize: 6,alignment:'right',italics:true},
					{	style:'tableStyle',
						table: {
							widths : ['5%','12%','10%','10%','11%','14%','13%','12%','13%'],
							//headerRows: 1,
							body:partGBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partGtxt.detG),fontSize: 7,alignment:'left'},
					{text:'\n*Notes:\n',fontSize: 7,bold:true},
					{text:'\n1.Defaults relate to processing of statements and do not include demand raised by the respective Assessing Officers.\n',fontSize: 7,bold:true},
					{text:'\n2.For more details please log on to TRACES as taxpayer.\n',fontSize: 7,bold:true},
					
					/*******Part H - changes : STARTS *****/
					{ text: '\nPART H - Details of Turnover as per GSTR-3B\n ',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['5%','18%','26%','12%','13%','13%','13%'],
							//headerRows: 1,
							body:partHBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partHtxt.detH),fontSize: 7,alignment:'left'},
					{text:'\nNotes:-\n',fontSize: 7,bold:true},
					{text:'\n1. The GSTN data displayed above includes internal stock transfers as well.\n',fontSize: 7,bold:true},
					/*******Part H - changes : ENDS *****/
					{ text: '\nContact Information\n\n',fontSize: 8,underlined:true,bold:true,style:'underline'},
					{	style:'tableStyle',
						table: {
							widths : ['20%','20%'],
							//headerRows: 1,
							body:ContactInfoBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{ text: '\n\nLegends used in Annual Tax Statement\n',fontSize: 8,underlined:true,bold:true,style:'underline'},
					{ text: '\n*Status Of Booking\n\n',fontSize: 8,underlined:true,bold:true},
					{	style:'tableStyle',
						table: {
							widths : ['10%','20%','70%'],
							//headerRows: 1,
							body:legendsBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{ text: '\n**Remarks\n\n',fontSize: 8,underlined:true,bold:true},
					{	style:'tableStyle',
						table: {
							widths : ['10%','90%'],
							//headerRows: 1,
							body:legendsDescBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text:'\n# Total Tax Deducted includes TDS, Surcharge and Education Cess',fontSize: 7},
					{text:'## Tax Deducted includes TDS, Surcharge and Education Cess',fontSize: 7},
					{text:'+ Total Tax Collected includes TCS, Surcharge and Education Cess',fontSize: 7},
					{text:'++ Tax Collected includes TCS, Surcharge and Education Cess',fontSize: 7},
					{text:'*** Total TDS Deposited will not include the amount deposited as Fees and Interest',fontSize: 7},
					{text:'### Total Amount Deposited other than TDS includes the Fees , Interest and Other etc.',fontSize: 7},
					{ text: '\nNotes for Annual Tax Statement',fontSize: 8,underlined:true,bold:true,style:'underline'},
					{text:'\na. Figures in brackets represent reversal (negative) entries',fontSize: 7},
					{text:'b. In Part C, details of tax paid are displayed excluding TDS or TCS, payments related to Securities Transaction Tax and Banking Cash Transaction Tax',fontSize: 7},
					{text:'c. Tax Credits appearing in Part A, A1, A2 and B of the Annual Tax Statement are on the basis of details given by deductor in the TDS / TCS statement filed by them. The same should be verified before claiming tax credit and only the amount which pertains to you should be claimed',fontSize: 7},
					{text:'d. This statement is issued on behalf of the Income Tax Department. See Section 203AA and second provision to Section 206C(5) of the Income Tax Act, 1961 and Rule 31AB of Income Tax Rules, 1962',fontSize: 7},
					{text:'e. This statement does not include payments pertaining to Assessment Year (AY) other than the AY mentioned above and payments against penalties',fontSize: 7},
					{text:'f. Date is displayed in dd-MMM-yyyy format',fontSize: 7},
					{text:'g. Details of Tax Deducted at Source in Annual Tax Statement, for Form 15G/15H includes transactions for which declaration under section 197A has been Quoted',fontSize: 7},
					{ text: '\n1.Sections\n\n',fontSize: 8,underlined:true,bold:true},
					{
					columns: [
						{	style:'tableStyle',
							table: {
								widths : ['10%','89%'],
								//headerRows: 1,
								body:sections1Body
							},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
						},
						[
							{
								columns: [
									{	style:'tableStyle',
											table: {
												widths : ['10%','89%'],
												//headerRows: 1,
												body:sections2Body
											},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
									},
								]
							}
						]
					]
				},
			{ text: '\n2.Minor Head                                                                                                                       3.Major Head\n\n',fontSize: 8,underlined:true,bold:true},
				{
					columns: [
						{	style:'tableStyle',
							table: {
								widths : ['10%','89%'],
								//headerRows: 1,
								body:minorHeadBody
							},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
						},
						[
							{
								columns: [
									{	style:'tableStyle',
											table: {
												widths : ['10%','89%'],
												//headerRows: 1,
												body:majorHeadBody
											},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
									},
								]
							}
						]
					]
				},
					{ text: '\n4.Type of Transaction\n\n',fontSize: 8,underlined:true,bold:true},
					{	style:'tableStyle',
						table: {
							widths : ['10%','90%'],
							//headerRows: 1,
							body:typeOfTransBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{ text: '\nGlossary\n\n',fontSize: 8,underlined:true,bold:true},
					{
					columns: [
						{	style:'tableStyle',
							table: {
								widths : ['15%','84%'],
								//headerRows: 1,
								body:glossary1Body
							},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
						},
						[
							{
								columns: [
									{	style:'tableStyle',
											table: {
												widths : ['15%','84%'],
												//headerRows: 1,
												body:glossary2Body
											},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
									},
								]
							}
						]
					]
				},
			],
			styles: {
				tableStyle: {
					margin: [0,0,0,0],
					paddingLeft:0,
					paddingRight:0,
					fontSize: 7
				},
				tableHeader: {
					bold:true,
					fillColor:'#035b87',
					color:'white',
					fontSize: 7,
					alignment: 'center'
				},
				subtableHeader: {
				bold:true,
					fillColor:'#c5d9f1',
					alignment: 'center',
					fontSize: 7
				},
				headings: {
					margin: [0,0,0,0],
				bold:true,
					fontSize: 7,
					color:'#366092'
			},
			dataFieldStyle: {
					fontSize: 7,
					alignment: 'center'
			},
			amtFieldStyle: {
					fontSize: 7,
					alignment: 'right'
			},
			underline: {
				decoration:'underline'
			},
			amtFieldHeader: {
					bold:true,
					fillColor:'#035b87',
					color:'white',
					fontSize: 7,
					alignment: 'right'
			},
			txtFieldHeader: {
					color:'red',
					fontSize: 7,
					alignment: 'justified'
			},
			txtFieldHeader2: {
					alignment: 'left'
			},
			txtFieldHeader3: {
					alignment: 'center'
			}
			}
		}
	}
	else if(assYrSelVal>'2019'){	
		dd = {
			pageMargins: [10,25,20,20],//Left,Top, Right, Bottom
			pageOrientation: 'potrait',
			background :{image : getBase64ImgUrl('watermark'),width:441, height:350,margin:[50,250,50,50]},
			header : function(page){
				if(page!=1){
					return {
						columns :[
							{text:'Assessee PAN: '+document.getElementById("pan").innerHTML,fontSize: 7,alignment:'left'},
							{text:'Assessee Name: '+document.getElementById("dedPanName").innerText,fontSize: 7,alignment:'center'},
							{text:'Assessment Year: '+document.getElementById("assessYearSelectedVal").innerHTML,fontSize: 7,alignment:'right'},
						],
						margin : [20,5]
					};
				}
			},
			content: [
					{text:"Data updated till "+getFormattedDate() + "\n ",fontSize: 7,alignment:'right'},
					{columns: [
					{text :'', paddingRight:50},
					{image : getBase64ImgUrl('logo'),width:442, height:67,paddingRight:100},
					{text :'', paddingRight:100},
					{image : getBase64ImgUrl('emblem'),width:86, height:54}
					]},
					{text:'\nForm 26AS\n',alignment: 'center',fontSize: 12,bold:true},
					{text:'\nAnnual Tax Statement under Section 203AA of the Income Tax Act, 1961\n\n',alignment: 'center',fontSize: 9,bold:true},
					{ul:['See Section 203AA and second provision to Section 206C (5) of the Income Tax Act, 1961 and Rule 31AB of Income Tax Rules, 1962\n\n'],fontSize: 7},
					
					{	style:'tableStyle',
						table: {
							widths : ['23%','10%','15%','14%','10%','7%','12%','7%'],
							body:[
								[{text: 'Permanent Account Number (PAN)', style:'tableHeader'},{text: document.getElementById("pan").innerHTML},
								{text: 'Current Status of PAN', style: 'tableHeader'},
								document.getElementById("inp").innerText=="Inoperative" ? 
								({columns:[{text:"Active and ",style:'txtFieldHeader2'},{text:" Inoperative",style:'txtFieldHeader'}]}):
								document.getElementById("panStatus").innerHTML=="Deleted and Inoperative" || document.getElementById("panStatus").innerHTML=="Deleted" || document.getElementById("panStatus").innerHTML=="Deactivated" ?
								({text: document.getElementById("panStatus").innerHTML,style:'txtFieldHeader'}):
								({text: document.getElementById("panStatus").innerHTML,style:'txtFieldHeader3'}),
								{text: 'Financial Year',style:'tableHeader'},{text: document.getElementById("financialYear").innerHTML},
								{text: 'Assessment Year',style:'tableHeader'},{text: document.getElementById("assessYearSelectedVal").innerHTML}
								],
								[{text: 'Name of Assessee', style:'tableHeader'},{text: document.getElementById("dedPanName").innerText,colSpan: 7},'','','','','',''
								],
								[{text: 'Address of Assessee', style:'tableHeader'},{text: document.getElementById("add1").innerText + "\n" + document.getElementById("add2").innerText,colSpan: 7},'','','','','',''
								]
							]
						},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text:'\n ',fontSize: 6},
					{ul:['Above data / Status of PAN is as per PAN details. For any changes in data as mentioned above, you may submit request for corrections\nRefer www.tinpan.proteantech.in / www.utiitsl.com for more details. In case of discrepancy in status of PAN please contact your Assessing Officer\n  ','Communication details for TRACES can be updated in ' +"'Profile'"+' section. However, these changes will not be updated in PAN database as mentioned above\n '],fontSize: 7},
					{text:'(All amount values are in INR)',fontSize: 6,alignment:'right',italics:true},
					{text:'PART A - Details of Tax Deducted at Source\n\n',style: 'headings'},
					{style:'tableStyle',
						table: {
							widths : ['5%','10%','12%','12%','11%','11%','13%','14%','12%'],
							body:partABody
						},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partabtxt.detA),fontSize: 7,alignment:'left'},
					/*******Part A1 changes*****/
					{ text: '\nPART A1 - Details of Tax Deducted at Source for 15G / 15H\n ',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['5%','13%','14%','13%','12%','16%','15%','12%'],
							//headerRows: 1,
							body:partA1Body
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partabtxt.detA1),fontSize: 7,alignment:'left'},
					/*******Part A2 changes*****/
					{ text: '\nPART A2 - Details of Tax Deducted at Source on Sale of Immovable Property u/s 194IA/ TDS on Rent of Property u/s 194IB / TDS on payment to resident contractors and professionals u/s 194M (For Seller/Landlord of Property/Payee of resident contractors and professionals)\n ',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['5%','13%','28%','13%','14%','14%','13%'],
							//headerRows: 1,
							body:partA2Body
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partA2txt.detA2),fontSize: 7,alignment:'left'},
					/*******Part B changes*****/
					{ text: '\nPART B - Details of Tax Collected at Source\n\n',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['5%','10%','11%','13%','11%','11%','13%','14%','12%'],
							//headerRows: 1,
							body:partBBody
						},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partabtxt.detB),fontSize: 7,alignment:'left'},
					/*******Part C changes*****/
				{ text: '\nPART C - Details of Tax Paid (other than TDS or TCS)\n ',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['4%','5%','5%','9%','8%','7%','7%','7%','7%','9%','7%','10%','6%','9%'],// CR 638 New Column changes
							//headerRows: 1,
							body:partCBody
						},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partctxt.detC),fontSize: 7,alignment:'left'},
					/*******Part D changes*****/
					{ text: '\nPart D - Details of Paid Refund\n ',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['4%','14%','9%','10%','12%','15%','12%','13%','11%'],
							//headerRows: 1,
							body:partDBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partdtxt.detD),fontSize: 7,alignment:'left'},
					/*******Part E changes*****/
					/*******Part E CR459 SFT changes*****/
					{ text: getPartEHeader(assYrSelVal),style: 'headings'},
				
				
					{	style:'tableStyle',
						table: {
							//widths: [assYrSelVal>2016? '\['4%','32%','34%','8%','0%','0%','18%','0%','4%'\]' : '\['4%','12%','34%','8%','11%','7%','11%','6%','7%'\]'],
							//widths: ['4%','12%','34%','8%','11%','7%','11%','6%','7%'],
							//headerRows: 1,
							body:partEBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partetxt.detE),fontSize: 7,alignment:'left'},
					/*** notes added****/
					{text: getPartENote(assYrSelVal),fontSize: 7,bold:true}, 
					/*******Part F changes*****/
					{ text: '\nPART F - Details of Tax Deducted at Source on Sale of Immovable Property u/s 194IA/ TDS on Rent of Property u/s 194IB /TDS on payment to resident contractors and professionals u/s 194M (For Buyer/Tenant of Property /Payer of resident contractors and professionals)\n ',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['4%','12%','27%','10%','10%','13%','12%','12%'],
							//headerRows: 1,
							body:partFBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partftxt.detF),fontSize: 7,alignment:'left'},
					/*******Part G changes*****/
					{ text: '\nPART G - TDS Defaults* (Processing of Statements)\n ',style: 'headings'},
					{text:'(All amount values are in INR)',fontSize: 6,alignment:'right',italics:true},
					{	style:'tableStyle',
						table: {
							widths : ['5%','12%','10%','10%','11%','14%','13%','12%','13%'],
							//headerRows: 1,
							body:partGBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partGtxt.detG),fontSize: 7,alignment:'left'},
					{text:'\n*Notes:\n',fontSize: 7,bold:true},
					{text:'\n1.Defaults relate to processing of statements and do not include demand raised by the respective Assessing Officers.\n',fontSize: 7,bold:true},
					{text:'\n2.For more details please log on to TRACES as taxpayer.\n',fontSize: 7,bold:true},
					
					/*******Part H - changes : STARTS *****/
					{ text: '\nPART H - Details of Turnover as per GSTR-3B\n ',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['5%','18%','26%','12%','13%','13%','13%'],
							//headerRows: 1,
							body:partHBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partHtxt.detH),fontSize: 7,alignment:'left'},
					{text:'\nNotes:-\n',fontSize: 7,bold:true},
					{text:'\n1. The GSTN data displayed above includes internal stock transfers as well.\n',fontSize: 7,bold:true},
					/*******Part H - changes : ENDS *****/
					{ text: '\nContact Information\n\n',fontSize: 8,underlined:true,bold:true,style:'underline'},
					{	style:'tableStyle',
						table: {
							widths : ['20%','20%'],
							//headerRows: 1,
							body:ContactInfoBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{ text: '\n\nLegends used in Form 26AS\n',fontSize: 8,underlined:true,bold:true,style:'underline'},
					{ text: '\n*Status Of Booking\n\n',fontSize: 8,underlined:true,bold:true},
					{	style:'tableStyle',
						table: {
							widths : ['10%','20%','70%'],
							//headerRows: 1,
							body:legendsBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{ text: '\n**Remarks\n\n',fontSize: 8,underlined:true,bold:true},
					{	style:'tableStyle',
						table: {
							widths : ['10%','90%'],
							//headerRows: 1,
							body:legendsDescBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text:'\n# Total Tax Deducted includes TDS, Surcharge and Education Cess',fontSize: 7},
					{text:'## Tax Deducted includes TDS, Surcharge and Education Cess',fontSize: 7},
					{text:'+ Total Tax Collected includes TCS, Surcharge and Education Cess',fontSize: 7},
					{text:'++ Tax Collected includes TCS, Surcharge and Education Cess',fontSize: 7},
					{text:'*** Total TDS Deposited will not include the amount deposited as Fees and Interest',fontSize: 7},
					{text:'### Total Amount Deposited other than TDS includes the Fees , Interest and Other etc.',fontSize: 7},
					{ text: '\nNotes for Form 26AS',fontSize: 8,underlined:true,bold:true,style:'underline'},
					{text:'\na. Figures in brackets represent reversal (negative) entries',fontSize: 7},
					{text:'b. In Part C, details of tax paid are displayed excluding TDS or TCS, payments related to Securities Transaction Tax and Banking Cash Transaction Tax',fontSize: 7},
					{text:'c. Tax Credits appearing in Part A, A1, A2 and B of the Annual Tax Statement are on the basis of details given by deductor in the TDS / TCS statement filed by them. The same should be verified before claiming tax credit and only the amount which pertains to you should be claimed',fontSize: 7},
					{text:'d. This statement is issued on behalf of the Income Tax Department. See Section 203AA and second provision to Section 206C(5) of the Income Tax Act, 1961 and Rule 31AB of Income Tax Rules, 1962',fontSize: 7},
					{text:'e. This statement does not include payments pertaining to Assessment Year (AY) other than the AY mentioned above and payments against penalties',fontSize: 7},
					{text:'f. Date is displayed in dd-MMM-yyyy format',fontSize: 7},
					{text:'g. Details of Tax Deducted at Source in Form 26AS, for Form 15G/15H includes transactions for which declaration under section 197A has been Quoted',fontSize: 7},
					{ text: '\n1.Sections\n\n',fontSize: 8,underlined:true,bold:true},
					{
					columns: [
						{	style:'tableStyle',
							table: {
								widths : ['10%','89%'],
								//headerRows: 1,
								body:sections1Body
							},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
						},
						[
							{
								columns: [
									{	style:'tableStyle',
											table: {
												widths : ['10%','89%'],
												//headerRows: 1,
												body:sections2Body
											},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
									},
								]
							}
						]
					]
				},
			{ text: '\n2.Minor Head                                                                                                                       3.Major Head\n\n',fontSize: 8,underlined:true,bold:true},
				{
					columns: [
						{	style:'tableStyle',
							table: {
								widths : ['10%','89%'],
								//headerRows: 1,
								body:minorHeadBody
							},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
						},
						[
							{
								columns: [
									{	style:'tableStyle',
											table: {
												widths : ['10%','89%'],
												//headerRows: 1,
												body:majorHeadBody
											},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
									},
								]
							}
						]
					]
				},
					{ text: '\n4.Type of Transaction\n\n',fontSize: 8,underlined:true,bold:true},
					{	style:'tableStyle',
						table: {
							widths : ['10%','90%'],
							//headerRows: 1,
							body:typeOfTransBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{ text: '\nGlossary\n\n',fontSize: 8,underlined:true,bold:true},
					{
					columns: [
						{	style:'tableStyle',
							table: {
								widths : ['15%','84%'],
								//headerRows: 1,
								body:glossary1Body
							},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
						},
						[
							{
								columns: [
									{	style:'tableStyle',
											table: {
												widths : ['15%','84%'],
												//headerRows: 1,
												body:glossary2Body
											},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
									},
								]
							}
						]
					]
				},
			],
			styles: {
				tableStyle: {
					margin: [0,0,0,0],
					paddingLeft:0,
					paddingRight:0,
					fontSize: 7
				},
				tableHeader: {
					bold:true,
					fillColor:'#035b87',
					color:'white',
					fontSize: 7,
					alignment: 'center'
				},
				subtableHeader: {
				bold:true,
					fillColor:'#c5d9f1',
					alignment: 'center',
					fontSize: 7
				},
				headings: {
					margin: [0,0,0,0],
				bold:true,
					fontSize: 7,
					color:'#366092'
			},
			dataFieldStyle: {
					fontSize: 7,
					alignment: 'center'
			},
			amtFieldStyle: {
					fontSize: 7,
					alignment: 'right'
			},
			underline: {
				decoration:'underline'
			},
			amtFieldHeader: {
					bold:true,
					fillColor:'#035b87',
					color:'white',
					fontSize: 7,
					alignment: 'right'
			},
			txtFieldHeader: {
					color:'red',
					fontSize: 7,
					alignment: 'justified'
			},
			txtFieldHeader2: {
					alignment: 'left'
			},
			txtFieldHeader3: {
					alignment: 'center'
			}
			}
		}
	}
	else{	
		dd = {
			pageMargins: [10,25,20,20],//Left,Top, Right, Bottom
			pageOrientation: 'potrait',
			background :{image : getBase64ImgUrl('watermark'),width:441, height:350,margin:[50,250,50,50]},
			header : function(page){
				if(page!=1){
					return {
						columns :[
							{text:'Assessee PAN: '+document.getElementById("pan").innerHTML,fontSize: 7,alignment:'left'},
							{text:'Assessee Name: '+document.getElementById("dedPanName").innerText,fontSize: 7,alignment:'center'},
							{text:'Assessment Year: '+document.getElementById("assessYearSelectedVal").innerHTML,fontSize: 7,alignment:'right'},
						],
						margin : [20,5]
					};
				}
			},
			content: [
					{text:"Data updated till "+getFormattedDate() + "\n ",fontSize: 7,alignment:'right'},
					{columns: [
					{text :'', paddingRight:50},
					{image : getBase64ImgUrl('logo'),width:442, height:67,paddingRight:100},
					{text :'', paddingRight:100},
					{image : getBase64ImgUrl('emblem'),width:86, height:54}
					]},
					{text:'\nForm 26AS\n',alignment: 'center',fontSize: 12,bold:true},
					{text:'\nAnnual Tax Statement under Section 203AA of the Income Tax Act, 1961\n\n',alignment: 'center',fontSize: 9,bold:true},
					{ul:['See Section 203AA and second provision to Section 206C (5) of the Income Tax Act, 1961 and Rule 31AB of Income Tax Rules, 1962\n\n'],fontSize: 7},
					
					{	style:'tableStyle',
						table: {
							widths : ['23%','10%','15%','14%','10%','7%','12%','7%'],
							body:[
								[{text: 'Permanent Account Number (PAN)', style:'tableHeader'},{text: document.getElementById("pan").innerHTML},
								{text: 'Current Status of PAN', style: 'tableHeader'},
								document.getElementById("inp").innerText=="Inoperative" ? 
								({columns:[{text:"Active and ",style:'txtFieldHeader2'},{text:" Inoperative",style:'txtFieldHeader'}]}):
								document.getElementById("panStatus").innerHTML=="Deleted and Inoperative" || document.getElementById("panStatus").innerHTML=="Deleted" || document.getElementById("panStatus").innerHTML=="Deactivated" ?
								({text: document.getElementById("panStatus").innerHTML,style:'txtFieldHeader'}):
								({text: document.getElementById("panStatus").innerHTML,style:'txtFieldHeader3'}),
								{text: 'Financial Year',style:'tableHeader'},{text: document.getElementById("financialYear").innerHTML},
								{text: 'Assessment Year',style:'tableHeader'},{text: document.getElementById("assessYearSelectedVal").innerHTML}
								],
								[{text: 'Name of Assessee', style:'tableHeader'},{text: document.getElementById("dedPanName").innerText,colSpan: 7},'','','','','',''
								],
								[{text: 'Address of Assessee', style:'tableHeader'},{text: document.getElementById("add1").innerText + "\n" + document.getElementById("add2").innerText,colSpan: 7},'','','','','',''
								]
							]
						},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text:'\n ',fontSize: 6},
					{ul:['Above data / Status of PAN is as per PAN details. For any changes in data as mentioned above, you may submit request for corrections\nRefer www.tinpan.proteantech.in / www.utiitsl.com for more details. In case of discrepancy in status of PAN please contact your Assessing Officer\n  ','Communication details for TRACES can be updated in ' +"'Profile'"+' section. However, these changes will not be updated in PAN database as mentioned above\n '],fontSize: 7},
					{text:'(All amount values are in INR)',fontSize: 6,alignment:'right',italics:true},
					{text:'PART A - Details of Tax Deducted at Source\n\n',style: 'headings'},
					{style:'tableStyle',
						table: {
							widths : ['5%','10%','12%','12%','11%','11%','13%','14%','12%'],
							body:partABody
						},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partabtxt.detA),fontSize: 7,alignment:'left'},
					/*******Part A1 changes*****/
					{ text: '\nPART A1 - Details of Tax Deducted at Source for 15G / 15H\n ',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['5%','13%','14%','13%','12%','16%','15%','12%'],
							//headerRows: 1,
							body:partA1Body
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partabtxt.detA1),fontSize: 7,alignment:'left'},
					/*******Part A2 changes*****/
					{ text: '\nPART A2 - Details of Tax Deducted at Source on Sale of Immovable Property u/s 194IA/ TDS on Rent of Property u/s 194IB / TDS on payment to resident contractors and professionals u/s 194M (For Seller/Landlord of Property/Payee of resident contractors and professionals)\n ',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['5%','13%','28%','13%','14%','14%','13%'],
							//headerRows: 1,
							body:partA2Body
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partA2txt.detA2),fontSize: 7,alignment:'left'},
					/*******Part B changes*****/
					{ text: '\nPART B - Details of Tax Collected at Source\n\n',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['5%','10%','11%','13%','11%','11%','13%','14%','12%'],
							//headerRows: 1,
							body:partBBody
						},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partabtxt.detB),fontSize: 7,alignment:'left'},
					/*******Part C changes*****/
				{ text: '\nPART C - Details of Tax Paid (other than TDS or TCS)\n ',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['4%','5%','5%','9%','8%','7%','7%','7%','7%','9%','7%','10%','6%','9%'],// CR 638 New Column changeses
							//headerRows: 1,
							body:partCBody
						},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partctxt.detC),fontSize: 7,alignment:'left'},
					/*******Part D changes*****/
					{ text: '\nPart D - Details of Paid Refund\n ',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['4%','14%','9%','10%','12%','15%','12%','13%','11%'],
							//headerRows: 1,
							body:partDBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partdtxt.detD),fontSize: 7,alignment:'left'},
					/*******Part E changes*****/
					/*******Part E CR459 SFT changes*****/
					{ text: getPartEHeader(assYrSelVal),style: 'headings'},
				
				
					{	style:'tableStyle',
						table: {
							//widths: [assYrSelVal>2016? '\['4%','32%','34%','8%','0%','0%','18%','0%','4%'\]' : '\['4%','12%','34%','8%','11%','7%','11%','6%','7%'\]'],
							//widths: ['4%','12%','34%','8%','11%','7%','11%','6%','7%'],
							//headerRows: 1,
							body:partEBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partetxt.detE),fontSize: 7,alignment:'left'},
					/*** notes added****/
					{text: getPartENote(assYrSelVal),fontSize: 7,bold:true}, 
					/*******Part F changes*****/
					{ text: '\nPART F - Details of Tax Deducted at Source on Sale of Immovable Property u/s 194IA/ TDS on Rent of Property u/s 194IB /TDS on payment to resident contractors and professionals u/s 194M (For Buyer/Tenant of Property /Payer of resident contractors and professionals)\n ',style: 'headings'},
					{	style:'tableStyle',
						table: {
							widths : ['4%','12%','27%','10%','10%','13%','12%','12%'],
							//headerRows: 1,
							body:partFBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partftxt.detF),fontSize: 7,alignment:'left'},
					/*******Part G changes*****/
					{ text: '\nPART G - TDS Defaults* (Processing of Statements)\n ',style: 'headings'},
					{text:'(All amount values are in INR)',fontSize: 6,alignment:'right',italics:true},
					{	style:'tableStyle',
						table: {
							widths : ['5%','12%','10%','10%','11%','14%','13%','12%','13%'],
							//headerRows: 1,
							body:partGBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text : getNoDataMsg(pdfData.partGtxt.detG),fontSize: 7,alignment:'left'},
					{text:'\n*Notes:\n',fontSize: 7,bold:true},
					{text:'\n1.Defaults relate to processing of statements and do not include demand raised by the respective Assessing Officers.\n',fontSize: 7,bold:true},
					{text:'\n2.For more details please log on to TRACES as taxpayer.\n',fontSize: 7,bold:true},
					{text: '\nContact Information\n\n',fontSize: 8,underlined:true,bold:true,style:'underline'},
					{	style:'tableStyle',
						table: {
							widths : ['20%','20%'],
							//headerRows: 1,
							body:ContactInfoBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{ text: '\n\nLegends used in Form 26AS\n',fontSize: 8,underlined:true,bold:true,style:'underline'},
					{ text: '\n*Status Of Booking\n\n',fontSize: 8,underlined:true,bold:true},
					{	style:'tableStyle',
						table: {
							widths : ['10%','20%','70%'],
							//headerRows: 1,
							body:legendsBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{ text: '\n**Remarks\n\n',fontSize: 8,underlined:true,bold:true},
					{	style:'tableStyle',
						table: {
							widths : ['10%','90%'],
							//headerRows: 1,
							body:legendsDescBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{text:'\n# Total Tax Deducted includes TDS, Surcharge and Education Cess',fontSize: 7},
					{text:'## Tax Deducted includes TDS, Surcharge and Education Cess',fontSize: 7},
					{text:'+ Total Tax Collected includes TCS, Surcharge and Education Cess',fontSize: 7},
					{text:'++ Tax Collected includes TCS, Surcharge and Education Cess',fontSize: 7},
					{text:'*** Total TDS Deposited will not include the amount deposited as Fees and Interest',fontSize: 7},
					{text:'### Total Amount Deposited other than TDS includes the Fees , Interest and Other etc.',fontSize: 7},
					{text: '\nNotes for Form 26AS',fontSize: 8,underlined:true,bold:true,style:'underline'},
					{text:'\na. Figures in brackets represent reversal (negative) entries',fontSize: 7},
					{text:'b. In Part C, details of tax paid are displayed excluding TDS or TCS, payments related to Securities Transaction Tax and Banking Cash Transaction Tax',fontSize: 7},
					{text:'c. Tax Credits appearing in Part A, A1, A2 and B of the Annual Tax Statement are on the basis of details given by deductor in the TDS / TCS statement filed by them. The same should be verified before claiming tax credit and only the amount which pertains to you should be claimed',fontSize: 7},
					{text:'d. This statement is issued on behalf of the Income Tax Department. See Section 203AA and second provision to Section 206C(5) of the Income Tax Act, 1961 and Rule 31AB of Income Tax Rules, 1962',fontSize: 7},
					{text:'e. This statement does not include payments pertaining to Assessment Year (AY) other than the AY mentioned above and payments against penalties',fontSize: 7},
					{text:'f. Date is displayed in dd-MMM-yyyy format',fontSize: 7},
					{text:'g. Details of Tax Deducted at Source in Form 26AS, for Form 15G/15H includes transactions for which declaration under section 197A has been Quoted',fontSize: 7},
					{ text: '\n1.Sections\n\n',fontSize: 8,underlined:true,bold:true},
					{
					columns: [
						{	style:'tableStyle',
							table: {
								widths : ['10%','89%'],
								//headerRows: 1,
								body:sections1Body
							},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
						},
						[
							{
								columns: [
									{	style:'tableStyle',
											table: {
												widths : ['10%','89%'],
												//headerRows: 1,
												body:sections2Body
											},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
									},
								]
							}
						]
					]
				},
			{ text: '\n2.Minor Head                                                                                                                       3.Major Head\n\n',fontSize: 8,underlined:true,bold:true},
				{
					columns: [
						{	style:'tableStyle',
							table: {
								widths : ['10%','89%'],
								//headerRows: 1,
								body:minorHeadBody
							},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
						},
						[
							{
								columns: [
									{	style:'tableStyle',
											table: {
												widths : ['10%','89%'],
												//headerRows: 1,
												body:majorHeadBody
											},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
									},
								]
							}
						]
					]
				},
					{ text: '\n4.Type of Transaction\n\n',fontSize: 8,underlined:true,bold:true},
					{	style:'tableStyle',
						table: {
							widths : ['10%','90%'],
							//headerRows: 1,
							body:typeOfTransBody
					},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
					},
					{ text: '\nGlossary\n\n',fontSize: 8,underlined:true,bold:true},
					{
					columns: [
						{	style:'tableStyle',
							table: {
								widths : ['15%','84%'],
								//headerRows: 1,
								body:glossary1Body
							},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
						},
						[
							{
								columns: [
									{	style:'tableStyle',
											table: {
												widths : ['15%','84%'],
												//headerRows: 1,
												body:glossary2Body
											},
						layout : {
							hLineWidth : function(i,node){
								return (i===0 || i===node.table.body.length)?0.1 :0.1;
							},
							vLineWidth : function(i,node){
								return (i===0 || i===node.table.widths.length)?0.1 :0.1;
							}
						}
									},
								]
							}
						]
					]
				},
			],
			styles: {
				tableStyle: {
					margin: [0,0,0,0],
					paddingLeft:0,
					paddingRight:0,
					fontSize: 7
				},
				tableHeader: {
					bold:true,
					fillColor:'#035b87',
					color:'white',
					fontSize: 7,
					alignment: 'center'
				},
				subtableHeader: {
				bold:true,
					fillColor:'#c5d9f1',
					alignment: 'center',
					fontSize: 7
				},
				headings: {
					margin: [0,0,0,0],
				bold:true,
					fontSize: 7,
					color:'#366092'
			},
			dataFieldStyle: {
					fontSize: 7,
					alignment: 'center'
			},
			amtFieldStyle: {
					fontSize: 7,
					alignment: 'right'
			},
			underline: {
				decoration:'underline'
			},
			amtFieldHeader: {
					bold:true,
					fillColor:'#035b87',
					color:'white',
					fontSize: 7,
					alignment: 'right'
			},
			txtFieldHeader: {
					color:'red',
					fontSize: 7,
					alignment: 'justified'
			},
			txtFieldHeader2: {
					alignment: 'left'
			},
			txtFieldHeader3: {
					alignment: 'center'
			}
			}
		}
	}
    var vtype;
	fileName = document.getElementById("pan").innerHTML + "-"+document.getElementById("assessYearSelectedVal").innerHTML.substring(0,4) + ".pdf";
	pdfMake.createPdf(dd).download(fileName);

	insertAudit(document.getElementById("assessYearSelectedVal").innerHTML.substring(0,4));		
}

if (typeof window !== 'undefined') {
    window.export26ASPdf = export26ASPdf;
}
export { export26ASPdf };