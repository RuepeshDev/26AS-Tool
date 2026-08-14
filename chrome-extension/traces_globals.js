// Extracted TRACES global variables and helpers for PDF generation offline.

// 1. Context Path
var g_ContextPath = '/serv';

// 2. Global Variable Declarations
var url26as = "/serv/tapn/srv/TDS26ASServlet";

var bundle_lbl_srNo = 'Sr. No.';
var err_invalidDetails = 'System has encountered some technical problem. Please try after some time';
var erro_26AsNoData = 'No Transactions Present';
var err_mandatory_AssessmentYear = 'Assessment Year is mandatory';
var WebRupee = ' '+'<span>('+' '+'</span><span class=\"WebRupee\">Rs.</span><span class=\"marLeft-3\">'+' '+')'
var br = '<br />';

var lbl_partAhed = 'PART A – Details of Tax Deducted at Source';
var lbl_tdsCertiNo = 'TDS Certificate Number';
var lbl_namDed = 'Name of Deductor'; 
var lbl_tanDed = 'TAN of Deductor';
var lbl_totAmtPaid = 'Total Amount <br /> Paid / <br /> Credited';
var lbl_totTaxDed = 'Total Tax Deducted<sup>#</sup>  ';
var lbl_totTdsDep = 'Total TDS<br /> Deposited';

var lbl_secDedMade = 'Section<sup>1</sup>';
var lbl_transDate = 'Transaction Date';			
var lbl_statOfBooking = 'Status  <br /> of Booking*';
var lbl_dateOfbokng = 'Date of <br /> Booking';
var lbl_remarkRevrsal = 'Remarks<sup>**</sup>  ';
var lbl_amtPaidCrdt = 'Amount <br /> Paid / <br /> Credited' ;
var lbl_taxdedSur = 'Tax <br />Deducted<sup>##</sup> ';
var lbl_tdsDep = 'TDS <br /> Deposited';

var lbl_partA1hed = 'PART A1 – Details of Tax Deducted at Source for 15G / 15H';

var lbl_partBhed = 'PART B – Details of Tax Collected at Source';
var lbl_nameColctr = 'Name of Collector'; 
var lbl_tanColctr = 'TAN of <br /> Collector';
var lbl_totAmtDebtd = 'Total Amount <br /> Paid / <br /> Debited';
var lbl_totTaxColctd = 'Total Tax <br /> Collected<sup>+</sup> ';
var lbl_totTcsDepstd = 'Total TCS <br /> Deposited';

var lbl_secColtnMade = 'Section<sup>1</sup>';
var lbl_amtPaidDeb = 'Amount <br /> Paid / <br /> Debited';
var lbl_taxColctd = 'Tax <br />Collected<sup>++</sup>  ';
var lbl_tcsDep = 'TCS <br />Deposited';

var lbl_partChed = 'PART C – Details of Tax Paid (other than TDS or TCS)';
var lbl_majHedCode = 'Major Head<sup>3</sup>';
var lbl_minHedCode = 'Minor Head<sup>2</sup>'; 
var lbl_tax = 'Tax';
var lbl_surcharge = 'Surcharge';
var lbl_eduCess = 'Education <br /> Cess';
//CR- 638 - New column changes -- Starts
var lbl_pnlAmt = 'Penalty';
var lbl_intAmt = 'Interest';
//CR- 638 - New column changes -- Ends
var lbl_others = 'Others';
var lbl_totTax = 'Total <br/> Tax';
var lbl_bsr = 'BSR Code'; 
var lbl_dateofdep = 'Date of Deposit';
var lbl_taxPayer_challanSerialNumber = 'Challan Serial Number';

var lbl_partDhed = 'Part D  – Details of Paid Refund';
var lbl_ayRefPaid = 'Assessment Year';
var lbl_modeofpaymnt = 'Mode';
var lbl_amtofRef = 'Amount of <br/>Refund';
var lbl_interest = 'Interest';
var lbl_dateRefPaid = 'Date of<br/> Payment';
var lbl_remarks = 'Remarks';

var lbl_partEhed = 'Part E – Details of AIR Transaction';
var lbl_natoftrnsc = 'Type of <br/> Transaction<sup>4</sup>';
var lbl_namofair = 'Name of AIR Filer';
var lbl_singleorjoint = 'Single / Joint Party <br/> Transaction';
var lbl_namofjointtrnsc = 'Number of<br/> Parties';
var lbl_taxPayer_amount = 'Amount';
var lbl_modeoftrnsc = 'Mode';
var err_tpReg = "Due to large size of Annual Tax Statement/Form 26AS, this request can only be processed on-demand. Please login to TRACES and submit download request for Annual Tax Statement/Form 26AS which would be made available to you in text format. If you have not yet registered on TRACES, please register by clicking on 'Register as New User' on TRACES home page and selecting type of user as 'Tax Payer'";

/* Added for Immovable Property */
var lbl_panOfDed = 'PAN Of Deductor';
var lbl_ackNo = 'Acknowledgement Number';
var lbl_tdsDeposit = 'TDS Deposited';
var lbl_secTrans = 'Section Under Which Deduction Made';
var lbl_totTransAmt = 'Total Transaction Amount';
var lbl_bookStat = 'Status of Booking<sup>*</sup>';
var lbl_bookDate = 'Date of Booking';
var lbl_partA2hed = 'PART A2 – Details of Tax Deducted at Source on Sale of Immovable Property u/s 194IA/ TDS on Rent of Property u/s 194IB / TDS on payment to resident contractors and professionals u/s 194M (For Seller/Landlord of Property/Payee of resident contractors and professionals)';

/*Added for View26AS Part F*/
var lbl_partFhed= 'PART F – Details of Tax Deducted at Source on Sale of Immovable Property u/s 194IA/ TDS on Rent of Property u/s 194IB /TDS on payment to resident contractors and professionals u/s 194M (For Buyer/Tenant of Property /Payer of resident contractors and professionals)';
var lbl_namdctee = 'Name of Deductee';
var lbl_pandctee = 'PAN of Deductee';
var lbl_otherAmt = 'Total Amount Deposited other than TDS**';
var lbl_tot_tdsDeposit = 'Total TDS Deposited**';
var lbl_tot_tds_depo = 'Total TDS deposited'

/* Added for Part G*/
var lbl_partGhed = 'PART G – TDS Defaults* (Processing of Statements)';
var lbl_partGTAN = 'TANs';
var lbl_shortPay = 'Short Payment';
var lbl_shortDeduction = 'Short Deduction';
var lbl_deflts_pymnt_int = 'Interest on  TDS Payments Default';
var lbl_deflts_ded_int = 'Interest on TDS Deduction Default';
var lbl_late_flng_levy = 'Late Filing Fee u/s 234E';
var lbl_intrst = 'Interest u/s 220(2)';
var lbl_partGTD = 'Total Default';
var lbl_financialYear = 'Financial Year';

/* Added for PartH*/
var lbl_partHhed = 'PART H – Details of Turnover as per GSTR-3B ';
var lbl_partH_GSTIN = 'GSTIN';
var lbl_partH_ARN = 'Application Reference Number (ARN)';
var lbl_partH_DtofFil = 'Date of filing';
var lbl_partH_RtnPrd = 'Return Period';
var lbl_partH_TxblTrnvr = 'Taxable Turnover';
var lbl_partH_TotTrnvr = 'Total Turnover';

/*Demand Payment Changes*/
var lbl_demand_payment_flg='Demand Payment';
//CR 709 Changes start
var lbl_part3hed = 'PART-III-Details of Transactions under Proviso to section 194B/First Proviso to sub-section (1) of section 194R/ Proviso to sub-section(1) of section 194S';
var lbl_part1hed = 'PART-I-Details of Tax Deducted at Source';
var lbl_part2hed = 'PART-II-Details of Tax Deducted at Source for 15G/15H';
var lbl_part4hed = 'PART-IV-Details of Tax Deducted at Source u/s 194IA/ 194IB / 194M/ 194S (For Seller/Landlord of Property/Contractors or Professionals/ Seller of Virtual Digital Asset)';
var lbl_part5hed = 'PART-VI-Details of Tax Collected at Source';
var lbl_part6hed = 'PART-VII-Details of Paid Refund (For which source is CPC-TDS. For other details refer AIS at E-Filing Portal)';
var lbl_part7hed = 'PART-VIII-Details of Tax Deducted at Source u/s 194IA/ 194IB /194M/194S (For Buyer/Tenant of Property /Person making payment to contractors or Professionals / Buyer of Virtual Digital Asset)';
var lbl_part8hed = 'PART-X-TDS/TCS Defaults* (Processing of Statements)';
var lbl_partAhed_1 = 'PART A – Details of Tax Deducted at Source';
var lbl_partA1hed_1 = 'PART A1 – Details of Tax Deducted at Source for 15G / 15H';
var lbl_partA2hed_1 = 'PART A2 – Details of Tax Deducted at Source on Sale of Immovable Property u/s 194IA/ TDS on Rent of Property u/s 194IB / TDS on payment to resident contractors and professionals u/s 194M (For Seller/Landlord of Property/Payee of resident contractors and professionals)';
var lbl_partBhed_1 = 'PART B – Details of Tax Collected at Source';
var lbl_partDhed_1 = 'Part D  – Details of Paid Refund';
var lbl_partFhed_1 = 'PART F – Details of Tax Deducted at Source on Sale of Immovable Property u/s 194IA/ TDS on Rent of Property u/s 194IB /TDS on payment to resident contractors and professionals u/s 194M (For Buyer/Tenant of Property /Payer of resident contractors and professionals)';
var lbl_partGhed_1 = 'PART G – TDS Defaults* (Processing of Statements)';
var lbl_part3hedIII = 'PART-III-Details of Transactions under Proviso to section 194B/First Proviso to sub-section (1) of section 194R/ Proviso to sub-section(1) of section 194S/Sub-section (2) of section 194BA';
//CR 709 Ends
//CR 743 Changes starts
var lbl_partVhed = 'PART-V-Details of Transactions under Proviso to sub-section(1) of section 194S as per Form-26QE (For Seller of Virtual Digital Asset)';
var lbl_partIXhed = 'PART-IX-Details of Transactions/Demand Payments under Proviso to sub-section(1) of section 194S as per Form 26QE (For Buyer of Virtual Digital Asset)';
var lbl_bsr = 'BSR Code';
var lbl_tot_tax_amt = 'Total Tax Amount';
var lbl_name_seller = 'Name of Seller';
var lbl_pan_seller = 'PAN of seller';
var lbl_panofbuyer = 'PAN of Buyer';
var lbl_name_buyer = 'Name of Buyer';
//CR 743 Changes ends
/*SR306172- Added for Enhancement in 26AS Part-D (2 new columns added)*/
var lbl_tan_pan_26AS='Refund Issued';
var lbl_source_26AS='Nature of Refund';
// 26AS Download Link Start
var encSysTime = "";
var err_26AS_download = 'Something went wrong. Please try again after sometime.';
// 26AS Download Link End
var pdfData;

// 3. Helper Functions
function getBase64ImgUrl(url){
	var c = document.createElement('canvas');
	var img = document.getElementById(url);
	c.height = img.naturalHeight;
	c.width = img.naturalWidth;
	var ctx = c.getContext('2d');

	ctx.drawImage(img, 0, 0, c.width, c.height, 0, 0, c.width, c.height);
	var base64String = c.toDataURL();
	return base64String;
}

function getFormattedDate() {
   	var monthNames = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct","Nov", "Dec"];
	var date = new Date();
  	var day = date.getDate();
 	var monthIndex = date.getMonth();
  	var year = date.getFullYear();

  	return day + '-' + monthNames[monthIndex] + '-' + year;
}

function getNoDataMsg(data){
    if (data.length == 0){
    	return 'No Transactions Present';
    }else{
    	return '';
    }
}

function getPartEHeader(data){

	if(data>'2016'){
	var header='\nPart E - Details of SFT Transaction\n ';
		return header;
	}
	else{
		return '\nPart E - Details of AIR Transaction\n ';
	}
}

function getPartENote(data){
	if(data>'2016'){
		return '\nNotes for SFT: - \n 1. Amount shown for SFT-005 and SFT-010 is as per below formula:-\n Aggregate gross amount received from the Person (-) Aggregate gross amount paid to the Person';
	}
	else{
		return '\nNotes For AIR:\n 1.Due date for filing Annual Information return by specified entities (Filers) is 31st August, immediately following the FY in which transaction is registered / recorded. This section will be updated after filing AIR.\n2. Transaction amount is total amount reported by AIR filer. It does not reflect respective share of each individual in joint party transaction.';
	}
}
