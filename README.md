# Gun Laws & History of Violence

https://hopeakrout.github.io/Gun_Laws_and_History_of_Violence/

## Data Cleaning

The group collected five datasets for initial review.

The "Accidental Deaths 2018-2022" file had data within the columns that was applicable to the project scope. After inspecting the values of the "Address" column and acknowledging there were less values in this column compared to the relative columns in the dataset, as well as being unnecessary, this column was dropped. Miniumum cleaning was required, only the Incident date needed to be separate into month, day, year. As for the the injured, deaths, state, "incident ID" column names needed to be changed for further merging with other datasets.

The "Gun Violence Data 2013-2018" file also contained revalant columns and values that were later merged to accidental deaths to expand the time frame captured between the two datasets for 2015-2020. Multiple irrevalant columns were dropped to simplify the dataset. The Incident date, death, injuires columns were changed in the same manner as the columns in Accidental Deaths 2018-2022 dataset, to add in merging the data correctly.

The "Gun Data, Code book, OLS Regression Output - Gun Data" file and url sources were evaluated to validate if the dataset covered our set timespan of 2015-2020. The majority of the dataset only covered 2014-2016, and although cleaned for possible use, ultimately was discarded for the final dashboard. 

"Gun Law Provisions by Year & State" required little to no cleaning. This file provided adequate gun law descriptions in the code book, what state and year the law was enacted for all current laws in the every state.  

"Accidental Deaths 2018-2022" was merged with "Gun Violence 2013-2018" to expand the violence timeline from 2015-2020.The number of deaths and injuires from the merged files were then joined with "Gun Law Provision" to account for each state's death toll in relation to the gun laws present. 

## Machine Learning

The data allowed for multiple approaches.  The key question was to discover if any or all of the current gun laws are effective.  In the Random Forest model the dataset was cleaned to add a column defining if the state's death rate was above or below the national mean, and the accuracy was 85%.  The Logistics Regression model was able to achieve a training score of 1.0 and testing score of 0.9 in discovering if a state was above or below the national mean.  However, to build a predictive outcome for the app.py to work, the question and data needed to become simpler: how many laws does it take to lower gun violence?  The last model trimmed down the data to the number of total laws in effect by state and their respective deaths per capita from 2015-2020.  The data was split and tested using sklearn using Linear Regression and saved to be used as an app.py to run on a local host with Mongodb.

![image](https://user-images.githubusercontent.com/107294123/202929710-0ecabca6-8ddd-4c0d-b40c-5f46de430958.png)

![image](https://user-images.githubusercontent.com/107294123/202929742-50b33679-6626-48fa-a7b4-b7ad65ed1c00.png)


## Plotly Dashboard

The final display used JavaScript, Bootstrap, CSS, HTML, Python, and Plotly to create a dashboard that visualized our data.

A jumbotron was used to enlarge and highlight the dashboard's title and synopsis of the project.  It was important to be able to compare year over year and isolate each year's statistics as desired by the user, so a dropdown for each year was created.  This provides relavant national data by year on total firearm deaths, injuries, and the number of masss shootings nationwide.  

To the right of the yearly national data is a brief explanation and findings of the scatter plot below.

![image](https://user-images.githubusercontent.com/107294123/202929869-18043e3a-f159-41b8-93c5-af0de70881d5.png)


The Plotly scatter plot referenced in the explanation was used to display the correlation between state's gun law strength and their rate of gun deaths.  When selecting various years from the dropdown, the updated scatter plot will show the corrolation described in the brief explanation.

![image](https://user-images.githubusercontent.com/107294123/202930313-002c94fc-40b8-4439-980a-40ad9ad7ce4d.png)


A choropleth map was added to display the rate of deaths from mass shootings for each state to provide additional information about gun violence as some laws only focus on handguns and small firearms to combat the number of domestic incidents while mass shootings are more indicative of laws or lack there of regarding semi-automatics.

![image](https://user-images.githubusercontent.com/107294123/202930372-d7155dc0-484a-4156-ae05-cc666f9c8f2e.png)


## Conclusion

The project set out to discover whether or not laws enacted truly effected the rate of gun violence in America.  The topic was left open-ended in a way that attempted to create an unbiased result instead of using data to drive a particular desired outcome.  As the findings on the dashboard state, there was a correlation between the strength of the gun laws and states with higher rates of death.  The actual number of laws was less indicative of effectiveness but still holds a strong correlation.

In contrast, mass shootings do not show a strong correlation between the number of laws or strength of those laws to the number of mass shooting incidents.  This indicates that mass shootings possibly require a different dataset entirely to tie together cause and effect.  Perhaps data on mental health, police response time, laws revolving around the cause of inaction such as due process, what is considered evidence to allow police to intervene, intent to incite, etc. would be more helpful in creating a correlation.

![mass_shootings_vs_laws](https://user-images.githubusercontent.com/107223650/202931636-ecd846af-9574-45f7-b6f2-129236354b35.png)

Gun violence is caused by many factors, only one of which is the laws inacted by individual states to create safer communities and lowering preventable situtations.  However, for the sake of this project, the focus was narrowed down to only look at state laws and not other outside factors.  Acknowledging that this topic is expontentially more complex, the data nonetheless clearly shows that laws are an important piece of the equation in preventing gun violence.

## Sources:

https://giffords.org/lawcenter/resources/scorecard/
https://www2.census.gov/programs-surveys/popest/datasets/2010-2020/state/totals/
https://www.gunviolencearchive.org/past-tolls
https://www.cdc.gov/nchs/pressroom/sosmap/firearm_mortality/firearm.htm
https://statefirearmlaws.org
