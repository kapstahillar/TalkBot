<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CurrencyConversionController extends Controller
{	
	// Lack of validations is bad
	// All of this code is rushed
	// Needs to be cleaned
    public function ConvertCurrencyToAnother(Request $request) {		
		$validatedData = $request->validate([
            'paramsStringArray' => 'required|array|min:3'
        ]);

		// Array of all currencies
		$allCurrenciesTags = array_keys($this->GetAllCurrenciesFromAPI());			

		$moneyCount = $request->paramsStringArray[0];
		$currency1 = $request->paramsStringArray[1];
		$currency2 = $request->paramsStringArray[2];
		
		if (is_numeric($moneyCount) && 
			$this->validateCurrencyParam($currency1, $allCurrenciesTags) && 
			$this->validateCurrencyParam($currency2, $allCurrenciesTags)) {			
			$conversionRateObject = $this->GetCurrenciesConversionRate($currency1, $currency2);
			$firstKey = (array_keys($conversionRateObject)[0]);
			$conversionRate = $conversionRateObject[$firstKey];		
			$resultObject = [];
			$resultObject["validationPassed"] = true;
			$resultObject["conversionRate"] = $conversionRate;
			$resultObject["convertedAmount"] = $conversionRate * $moneyCount;
			return json_encode($resultObject);
		}
		$resultObject = [];
		$resultObject["validationPassed"] = false;
		$resultObject["conversionRate"] = -1;
		return json_encode($resultObject);
    }

    public function validateCurrencyParam(String $param, $allowedCurrencyTags) {    	
    	return in_array(strtoupper($param), $allowedCurrencyTags);
    }

    
    // Makes request into the free currencies api
    // and returns array of json currencies    
    // Needs Cache. No time time to implement
 	public function GetAllCurrenciesFromAPI() {				
		$response = Http::get(
			'https://free.currconv.com/api/v7/currencies?', [
				'apiKey' => 'd56f5541d16347043ba8'
			]
		);
		return $response->json()["results"];
    }

    // Sends currencies to api and retrieves their conversion rate
    // Returns result json object
    public function GetCurrenciesConversionRate($curreny1, $currency2) {	    	
		$response = Http::get(
			'https://free.currconv.com/api/v7/convert?', [
				'apiKey' => 'd56f5541d16347043ba8',
				'compact' => 'ultra',
				'q' => $curreny1 . "_" . $currency2
			]
		);

        return $response->json();
    }
}