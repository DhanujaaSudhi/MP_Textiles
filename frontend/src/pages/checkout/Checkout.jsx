// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';
// import 'leaflet/dist/leaflet.css';  // Import Leaflet CSS for map styles

// // 🟢 Embedded Leaflet CSS for better map layout
// const leafletCSS = `
// .leaflet-container {
//     width: 100%;
//     height: 400px;
//     z-index: 0;  /* Ensures the map is displayed below other elements if overlapping */
//     border-radius: 8px;  /* Rounded corners for a clean look */
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);  /* Subtle shadow for depth */
// }
// `;

// // Inject CSS into the page
// const style = document.createElement('style');
// style.textContent = leafletCSS;
// document.head.appendChild(style);

// // Fix for missing marker icons in Leaflet
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: markerIcon2x,
//     iconUrl: markerIcon,
//     shadowUrl: markerShadow,
// });

// const Checkout = () => {
//     const navigate = useNavigate();
//     const [address, setAddress] = useState('');
//     const [phone, setPhone] = useState('');
//     const [location, setLocation] = useState({ lat: 12.9716, lng: 77.5946 });  // Default location (Bangalore)

//     const handleAddressChange = (e) => setAddress(e.target.value);
//     const handlePhoneChange = (e) => setPhone(e.target.value);

//     const handleConfirmDetails = () => {
//         if (address && phone) {
//             navigate('/payment');
//         } else {
//             alert('Please enter both address and phone number.');
//         }
//     };

//     const handleLocationUpdate = () => {
//         alert('Location updated!');
//     };

//     return (
//         <div className="p-5 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
//             <h2 className="text-2xl mb-4 font-semibold text-center">Checkout</h2>
            
//             <div className="mb-6">
//                 <label className="block mb-2 font-medium">Address:</label>
//                 <input
//                     type="text"
//                     value={address}
//                     onChange={handleAddressChange}
//                     placeholder="Enter your address"
//                     className="border p-2 w-full rounded mb-2"
//                 />
//                 <button 
//                     onClick={handleLocationUpdate} 
//                     className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition duration-200"
//                 >
//                     Show on Map
//                 </button>
//             </div>
            
//             <div className="mb-6">
//                 <label className="block mb-2 font-medium">Phone Number:</label>
//                 <input
//                     type="text"
//                     value={phone}
//                     onChange={handlePhoneChange}
//                     placeholder="Enter your phone number"
//                     className="border p-2 w-full rounded"
//                 />
//             </div>

//             <div className="mb-6">
//                 <MapContainer center={[location.lat, location.lng]} zoom={15}>
//                     <TileLayer
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     />
//                     <Marker position={[location.lat, location.lng]}>
//                         <Popup>Your Location</Popup>
//                     </Marker>
//                 </MapContainer>
//             </div>

//             <div className="text-center">
//                 <button
//                     onClick={handleConfirmDetails}
//                     className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition duration-200"
//                 >
//                     Confirm & Proceed to Payment
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Checkout;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';  // 🟢 Import Axios for API requests
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';  // Import Leaflet CSS for map styles

// 🟢 Embedded Leaflet CSS for better map layout
const leafletCSS = `
.leaflet-container {
    width: 100%;
    height: 400px;
    z-index: 0;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
`;

// Inject CSS into the page
const style = document.createElement('style');
style.textContent = leafletCSS;
document.head.appendChild(style);

// Fix for missing marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const Checkout = () => {
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState({ lat: 12.9716, lng: 77.5946 });
    const [errors, setErrors] = useState({
        address: '',
        phone: '',
        location: ''
    });
    const [isLocationVerified, setIsLocationVerified] = useState(false);

    const validatePhoneNumber = (phone) => {
        // Indian phone number validation (10 digits, optionally starting with +91)
        const phoneRegex = /^(?:\+91)?[6-9]\d{9}$/;
        return phoneRegex.test(phone.replace(/\s+/g, ''));
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
        setIsLocationVerified(false); // Reset location verification when address changes
        setErrors(prev => ({ ...prev, address: '', location: '' }));
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        // Only allow numbers and + symbol
        if (!/^[0-9+]*$/.test(value)) return;
        setPhone(value);
        setErrors(prev => ({ ...prev, phone: '' }));
    };

    const handleLocationUpdate = async () => {
        if (!address.trim()) {
            setErrors(prev => ({ ...prev, address: 'Please enter an address first' }));
            return;
        }

        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`
            );
            
            if (response.data.length > 0) {
                const { lat, lon } = response.data[0];
                setLocation({ lat: parseFloat(lat), lng: parseFloat(lon) });
                setIsLocationVerified(true);
                setErrors(prev => ({ ...prev, location: '' }));
            } else {
                setErrors(prev => ({ ...prev, location: 'Address not found on map. Please enter a valid address' }));
                setIsLocationVerified(false);
            }
        } catch (error) {
            console.error('Error fetching location:', error);
            setErrors(prev => ({ ...prev, location: 'Failed to verify location. Please try again' }));
            setIsLocationVerified(false);
        }
    };

    const handleConfirmDetails = () => {
        const newErrors = {};

        // Validate phone
        if (!phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!validatePhoneNumber(phone)) {
            newErrors.phone = 'Please enter a valid 10-digit Indian phone number';
        }

        // Validate address and location
        if (!address.trim()) {
            newErrors.address = 'Address is required';
        }

        if (!isLocationVerified) {
            newErrors.location = 'Please verify your location on the map';
        }

        setErrors(newErrors);

        // Proceed only if there are no errors
        if (Object.keys(newErrors).length === 0) {
            // Store delivery details
            const deliveryDetails = {
                address,
                phone,
                location,
                verifiedLocation: isLocationVerified
            };
            localStorage.setItem('deliveryDetails', JSON.stringify(deliveryDetails));
            navigate('/payment');
        }
    };

    return (
        <div className="p-5 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl mb-4 font-semibold text-center">Checkout</h2>
            
            <div className="mb-6">
                <label className="block mb-2 font-medium">Address:</label>
                <input
                    type="text"
                    value={address}
                    onChange={handleAddressChange}
                    placeholder="Enter your complete address"
                    className={`border p-2 w-full rounded mb-2 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
                <div className="flex items-center gap-2">
                    <button 
                        onClick={handleLocationUpdate} 
                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Verify Location on Map
                    </button>
                    {isLocationVerified && (
                        <span className="text-green-500 flex items-center">
                            <i className="ri-check-line mr-1"></i> Location Verified
                        </span>
                    )}
                </div>
                {errors.location && (
                    <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
            </div>
            
            <div className="mb-6">
                <label className="block mb-2 font-medium">Phone Number:</label>
                <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="Enter 10-digit phone number"
                    maxLength="13"
                    className={`border p-2 w-full rounded ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
            </div>

            <div className="mb-6">
                <MapContainer center={[location.lat, location.lng]} zoom={15} key={`${location.lat}-${location.lng}`}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[location.lat, location.lng]}>
                        <Popup>Delivery Location</Popup>
                    </Marker>
                </MapContainer>
            </div>

            <div className="text-center">
                <button
                    onClick={handleConfirmDetails}
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition duration-200"
                >
                    Confirm & Proceed to Payment
                </button>
            </div>
        </div>
    );
};

export default Checkout;



