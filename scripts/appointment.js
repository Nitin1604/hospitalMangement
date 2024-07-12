const doctors = [
    {
        name: 'Dinesh Pendharkar',
        doctorDesc: "Director- Sarvodaya Cancer Institute",
        diseases: "Diabetes",
        startTime: 600, // 12 AM
        endTime: 4800,
        doctorImg: "https://d3ti1kcp1zfdnq.cloudfront.net/DR_DINESH_PENDHARKAR_80ebd57089.png"
    },
    {
        name: 'Naveen Sanchety',
        doctorDesc: "HOD & Associate Director - Radiation Oncology",
        diseases: "Malaria",
        startTime: 510,
        endTime: 930,
        doctorImg: "https://sdk-image2.s3.ap-south-1.amazonaws.com/small_Dr_Naveen_for_Website_ecc5624ea4.jpg"
    },
    {
        name: 'Neetu Singhal',
        doctorDesc: "HOD & Associate Director - Radiation Oncology",
        diseases: "Cancer",
        startTime: 600,
        endTime: 900,
        doctorImg: "https://d3ti1kcp1zfdnq.cloudfront.net/DR_NEETU_SINGHAL_0c4d7c0ddc.jpg"
    },
    {
        name: 'Swagat Dash',
        doctorDesc: "HOD & Senior Consultant - Nuclear Medicine",
        diseases: "Fever",
        startTime: 780,
        endTime: 880,
        doctorImg: "https://d3ti1kcp1zfdnq.cloudfront.net/DR_SWAGAT_DASH_291084f2ad.jpg"
    },
    {
        name: 'Abhishek Raj',
        doctorDesc: "Senior Consultant & Head (Unit I) Medical Oncology, Haematology & BMT",
        diseases: "Cardiovascular",
        startTime: 990,
        endTime: 1110,
        doctorImg: "https://d3ti1kcp1zfdnq.cloudfront.net/DR_ABHISHEK_RAJ_73722147a5.jpg"
    },
    {
        name: 'Vishnu Hari',
        doctorDesc: "Senior Consultant & Head (Unit II) - Medical Oncology",
        diseases: "Asthma",
        startTime: 820,
        endTime: 1000,
        doctorImg: "https://sdk-image2.s3.ap-south-1.amazonaws.com/small_dr_vishnu_394036c8eb.png"
    },
    {
        name: 'CP Bhatt (PhD)',
        doctorDesc: "Consultant - Medical Physicist",
        diseases: "Pulmonary Fibrosis",
        startTime: 780,
        endTime: 900,
        doctorImg: "https://d3ti1kcp1zfdnq.cloudfront.net/DR_CP_BHATT_PHD_5913f190ca.png"
    },
    {
        name: 'Divya Gupta',
        doctorDesc: "Consultant - Radiation Oncology",
        diseases: "Lung Cancer",
        startTime: 660,
        endTime: 900,
        doctorImg: "https://d3ti1kcp1zfdnq.cloudfront.net/DR_DIVYA_GUPTA_2ee37ed751.jpg"
    },
    {
        name: 'Vindhya Malasani',
        doctorDesc: "Attending Consultant - Nuclear Medicine",
        diseases: "Lung Disorder",
        startTime: 660,
        endTime: 840,
        doctorImg: "https://sdk-image2.s3.ap-south-1.amazonaws.com/small_Dr_Malasani_5c35a92035.jpg"
    },
    {
        name: 'Udbhav Kathpalia',
        doctorDesc: "Associate Consultant - Surgical Oncology",
        diseases: "Pneumonia",
        startTime: 690,
        endTime: 840,
        doctorImg: "https://d3ti1kcp1zfdnq.cloudfront.net/Dr_Udbhav_Kathpalia_5c064d2258.png"
    },
]



function convertMinutes(totalMinutes) {
    var hours = Math.floor(totalMinutes / 60);
    var minutes = totalMinutes % 60;

    var period = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    var formattedTime = hours + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + period;
    return formattedTime;

}

function timeToMinutesFromMidnight(timeStr) {
    // Split the time string into hours and minutes
    const [hoursStr, minutesStr] = timeStr.split(':');

    // Convert hours and minutes to numbers
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    // Calculate total minutes from midnight
    const totalMinutes = hours * 60 + minutes;

    return totalMinutes;
}


function createDoctorHtml(doctorIndex) {


    let htmlDocs = `
    <div class="doctorContentBox rounded-[24px] border-2 ml-[2px] mt-[40px] h-[155px] mr-[311px] hover:outline outline-offset-2 outline-blue-300 hover:bg-white hover:text-[#008FC5]">
        <img src="${doctors[doctorIndex].doctorImg}" class="h-[150px] ml-[5px]" alt="image not found">

        <div class="doctorContent text-[16px] ml-[141px] mt-[-126px]">
            <ul>
                <li class="font-bold">Dr. ${doctors[doctorIndex].name}</li>
                <li>${doctors[doctorIndex].doctorDesc}</li>
                <li>Available from ${convertMinutes(doctors[doctorIndex].startTime)} - ${convertMinutes(doctors[doctorIndex].endTime)}</li>
            </ul>
            
            <div class="bg-[#008FC5] text-white  cursor-pointer mt-2 p-2 rounded-lg text-center w-[210px!important]" onClick="openModel(${doctorIndex})" style="margin-left: auto; margin-right: 0;">
                Book Appointment
            </div>
        </div>
    </div>
    `;
    return htmlDocs;


}


function createDoctorCount() {
    let textCount = `Available Doctors (${doctors.length})`;
    document.getElementById('drcount').innerHTML = textCount;
}

function createDoctorsList() {
    for (let i = 0; i < doctors.length; i++) {
        let drHtml = createDoctorHtml(i).trim();
        var temp = document.createElement('div');
        temp.innerHTML = drHtml;
        var drHtmlObject = temp.firstChild;
        document.getElementById('doctorList').appendChild(drHtmlObject);

    }
}

function openModel(doctorIndex) {
    document.getElementById('myModal').classList.remove('hidden');
    document.getElementById('modelTitle').innerHTML = `Book Appointment for Dr. ${doctors[doctorIndex].name}`;

    var inputElement = document.getElementById('doctorNameInput');
    inputElement.value = `Dr. ${doctors[doctorIndex].name}`;

    var doctorIndexElement = document.getElementById('doctorIndex');
    doctorIndexElement.value = doctorIndex;
}


function verifyAndStoreAppointmentData() {
    const form = document.getElementById('bookAppointmentForm');
    const doctorName = form.querySelector('input[name="doctorName"]').value;
    const personName = form.querySelector('input[name="personName"]').value;
    const appointmentTime = form.querySelector('input[name="appointmentTime"]').value;
    const doctorIndex = parseInt(document.getElementById('doctorIndex').value);


    let appointmentTimeInMinutes = timeToMinutesFromMidnight(appointmentTime);

    if (doctors[doctorIndex].startTime <= appointmentTimeInMinutes && doctors[doctorIndex].endTime > appointmentTimeInMinutes) {
        const appointmentData = {
            doctorName: doctorName,
            personName: personName,
            appointmentTime: appointmentTime
        };

        localStorage.setItem('appointment', JSON.stringify(appointmentData));
        console.log('Stored data:', JSON.stringify(appointmentData)); // Log stored data
        window.location.href = 'bookedAppointment.html';

    } else {
        alert("Doctor is not available");
    }
}


function initPage() {
    createDoctorCount();
    createDoctorsList();

    document.getElementById('bookAppointmentForm').addEventListener('submit', function (e) {
        e.preventDefault();
        verifyAndStoreAppointmentData();
    });
}

initPage();
