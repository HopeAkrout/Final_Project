# Gun Laws & History of Violence

https://hopeakrout.github.io/Gun_Laws_and_History_of_Violence/

## Data Cleaning and Analysis

The group collected five datasets for initial review.

The Accidental Deaths 2018-2022 file had data within the columns that was applicable to our scope. After inspected the values of Address column and acknowledging there were less values in this column compared to the relative columns in the dataset, this column was dropped. Miniumum cleaning was required, only the Incident date needed to be separate into month, day, year. As for the the injured, deaths, state, incident ID column names needed to be changed for further merging with other datasets.

Gun Violence Data 2013-2018 file also contained revalant columns and values that were later merged to accidental deaths to expand the time frame captured between the two datasets for 2013-2022. Multiple irrevalant columns were dropped that included sentate, representative districts, locations details other than state, participant (shooter) attributes, etc. The Incident date, death, injuires columns were changed in the same manner as the columns in Accidental Deaths 2018-2022 dataset, to add in merging the data correctly.

The Gun Data, Code book, OLS Regression Output - Gun Data file and sources were evaluated to validate if the dataset cover our set timespan of 2013-2020. Majority of the dataset only covered 2014-2016, instead of discarding the dataset, the other datasets were filter to display the data related to 2016. The row kept were the Percentage of House with register firearms, State ranked by Gun Violence, Number of Police per Captia, Population, State, Year. 

Gun Law Provisions by Year & State file required little to no cleaning. This file provided adequate gun law descriptions in the code book, what state and year was the law enacted for all current laws in the every state. The format of the file made it easy to be imported into the Machine Learning portion. 

The Accidental Deaths 2018-2022 was merged with Gun Violence 2013-2018 to expand the violence timeline from 2013-2022.The number of deaths and injuires from the merged files were then joined with Gun Law Provision to account for each state's death toll in relation to the gun laws present. The Gun Data, Code book, OLS Regression Output - Gun Data file was then joined with Accidental Deaths & Gun Violence for the gauge and description panel on our dashboard


