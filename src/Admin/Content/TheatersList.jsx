import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    FaSearch,
    FaPlus,
    FaEdit,
    FaTrash,
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaFilm,
    FaChevronDown,
    FaChevronUp,
    FaClock,
    FaWheelchair,
    FaParking,
    FaUtensils,
    FaWifi,
    FaGamepad,
    FaFilter,
    FaEye,
    FaTimes,
    FaSave,
    FaFileExport,
    FaFileImport,
    FaExclamationTriangle,
    FaSync,
    FaStar
} from 'react-icons/fa';
import { IoMdPeople } from 'react-icons/io';
import { BiCameraMovie } from 'react-icons/bi';
import { MdScreenshotMonitor, MdTheaters } from 'react-icons/md';

// Dữ liệu mẫu các rạp chiếu phim
const sampleTheatersData = [
    {
        id: 1,
        name: 'CineStar Quận 1',
        address: '271 Nguyễn Trãi, Phường Nguyễn Cư Trinh, Quận 1, TP.HCM',
        city: 'TP. Hồ Chí Minh',
        district: 'Quận 1',
        phone: '1900 2224',
        email: 'cinestar.q1@cinestar.com.vn',
        opening_time: '08:00 - 24:00',
        screens: 7,
        total_seats: 1200,
        opening_date: '2016-10-15',
        status: 'active',
        facilities: [
            'parking',
            'food_court',
            'wheelchair',
            'wifi',
            'game_zone'
        ],
        image: '/path-to-image-1.jpg',
        screen_types: ['2D', '3D', '4DX'],
        ticket_sales: 35820,
        ratings: 4.7
    },
    {
        id: 2,
        name: 'CineStar Quận 7',
        address:
            'Tầng 5, Crescent Mall, 101 Tôn Dật Tiên, Phường Tân Phú, Quận 7, TP.HCM',
        city: 'TP. Hồ Chí Minh',
        district: 'Quận 7',
        phone: '1900 2224',
        email: 'cinestar.q7@cinestar.com.vn',
        opening_time: '09:00 - 24:00',
        screens: 6,
        total_seats: 980,
        opening_date: '2017-05-22',
        status: 'active',
        facilities: ['parking', 'food_court', 'wheelchair', 'wifi'],
        image: '/path-to-image-2.jpg',
        screen_types: ['2D', '3D', 'IMAX'],
        ticket_sales: 32150,
        ratings: 4.6
    },
    {
        id: 3,
        name: 'CineStar Gò Vấp',
        address:
            'Tầng 5, TTTM Vincom Plaza, 12 Phan Văn Trị, Phường 5, Quận Gò Vấp, TP.HCM',
        city: 'TP. Hồ Chí Minh',
        district: 'Quận Gò Vấp',
        phone: '1900 2224',
        email: 'cinestar.govap@cinestar.com.vn',
        opening_time: '09:00 - 23:00',
        screens: 5,
        total_seats: 850,
        opening_date: '2018-03-08',
        status: 'active',
        facilities: ['parking', 'food_court', 'wheelchair', 'wifi'],
        image: '/path-to-image-3.jpg',
        screen_types: ['2D', '3D'],
        ticket_sales: 28740,
        ratings: 4.5
    },
    {
        id: 4,
        name: 'CineStar Thủ Đức',
        address:
            'Tầng 5, TTTM Vincom Thủ Đức, 216 Võ Văn Ngân, Phường Bình Thọ, TP.Thủ Đức, TP.HCM',
        city: 'TP. Hồ Chí Minh',
        district: 'TP. Thủ Đức',
        phone: '1900 2224',
        email: 'cinestar.thuduc@cinestar.com.vn',
        opening_time: '09:00 - 23:00',
        screens: 5,
        total_seats: 820,
        opening_date: '2019-11-15',
        status: 'active',
        facilities: ['parking', 'food_court', 'wheelchair'],
        image: '/path-to-image-4.jpg',
        screen_types: ['2D', '3D'],
        ticket_sales: 23560,
        ratings: 4.3
    },
    {
        id: 5,
        name: 'CineStar Huế',
        address:
            'Tầng 5, Vincom Plaza Huế, 50A Hùng Vương, TP. Huế, Thừa Thiên Huế',
        city: 'Thừa Thiên Huế',
        district: 'TP. Huế',
        phone: '1900 2224',
        email: 'cinestar.hue@cinestar.com.vn',
        opening_time: '09:00 - 23:00',
        screens: 4,
        total_seats: 650,
        opening_date: '2020-07-30',
        status: 'active',
        facilities: ['parking', 'food_court', 'wheelchair', 'wifi'],
        image: '/path-to-image-5.jpg',
        screen_types: ['2D', '3D'],
        ticket_sales: 18920,
        ratings: 4.4
    },
    {
        id: 6,
        name: 'CineStar Đà Nẵng',
        address:
            'Tầng 4, Vincom Đà Nẵng, 910 Ngô Quyền, Phường An Hải Bắc, Quận Sơn Trà, Đà Nẵng',
        city: 'Đà Nẵng',
        district: 'Quận Sơn Trà',
        phone: '1900 2224',
        email: 'cinestar.danang@cinestar.com.vn',
        opening_time: '09:00 - 23:30',
        screens: 5,
        total_seats: 780,
        opening_date: '2020-11-20',
        status: 'active',
        facilities: [
            'parking',
            'food_court',
            'wheelchair',
            'wifi',
            'game_zone'
        ],
        image: '/path-to-image-6.jpg',
        screen_types: ['2D', '3D', '4DX'],
        ticket_sales: 22480,
        ratings: 4.5
    },
    {
        id: 7,
        name: 'CineStar Biên Hòa',
        address:
            'Tầng 5, Vincom Plaza Biên Hòa, 1096 Phạm Văn Thuận, Phường Tân Mai, TP. Biên Hòa, Đồng Nai',
        city: 'Đồng Nai',
        district: 'TP. Biên Hòa',
        phone: '1900 2224',
        email: 'cinestar.bienhoa@cinestar.com.vn',
        opening_time: '09:00 - 23:00',
        screens: 4,
        total_seats: 620,
        opening_date: '2021-03-15',
        status: 'active',
        facilities: ['parking', 'food_court', 'wheelchair', 'wifi'],
        image: '/path-to-image-7.jpg',
        screen_types: ['2D', '3D'],
        ticket_sales: 17850,
        ratings: 4.3
    },
    {
        id: 8,
        name: 'CineStar Cần Thơ',
        address:
            'Tầng 4, Vincom Plaza Xuân Khánh, 209 đường 30/4, Phường Xuân Khánh, Quận Ninh Kiều, TP. Cần Thơ',
        city: 'Cần Thơ',
        district: 'Quận Ninh Kiều',
        phone: '1900 2224',
        email: 'cinestar.cantho@cinestar.com.vn',
        opening_time: '09:00 - 23:00',
        screens: 4,
        total_seats: 600,
        opening_date: '2021-10-10',
        status: 'active',
        facilities: ['parking', 'food_court', 'wheelchair'],
        image: '/path-to-image-8.jpg',
        screen_types: ['2D', '3D'],
        ticket_sales: 15320,
        ratings: 4.2
    },
    {
        id: 9,
        name: 'CineStar Hà Nội',
        address:
            'Tầng 6, Vincom Metropolis, 29 Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Hà Nội',
        city: 'Hà Nội',
        district: 'Quận Ba Đình',
        phone: '1900 2224',
        email: 'cinestar.hanoi@cinestar.com.vn',
        opening_time: '09:00 - 24:00',
        screens: 7,
        total_seats: 1100,
        opening_date: '2022-01-15',
        status: 'active',
        facilities: [
            'parking',
            'food_court',
            'wheelchair',
            'wifi',
            'game_zone'
        ],
        image: '/path-to-image-9.jpg',
        screen_types: ['2D', '3D', 'IMAX', '4DX'],
        ticket_sales: 26480,
        ratings: 4.6
    },
    {
        id: 10,
        name: 'CineStar Bình Dương',
        address:
            'Tầng 3, TTTM AEON Mall Bình Dương, Đại lộ Bình Dương, TP. Thuận An, Bình Dương',
        city: 'Bình Dương',
        district: 'TP. Thuận An',
        phone: '1900 2224',
        email: 'cinestar.binhduong@cinestar.com.vn',
        opening_time: '09:00 - 23:30',
        screens: 5,
        total_seats: 750,
        opening_date: '2022-05-20',
        status: 'maintenance',
        facilities: ['parking', 'food_court', 'wheelchair', 'wifi'],
        image: '/path-to-image-10.jpg',
        screen_types: ['2D', '3D'],
        ticket_sales: 9820,
        ratings: 4.4
    }
];

// Danh sách các tỉnh thành
const cities = [
    'TP. Hồ Chí Minh',
    'Hà Nội',
    'Đà Nẵng',
    'Cần Thơ',
    'Thừa Thiên Huế',
    'Đồng Nai',
    'Bình Dương'
];

// Component chính cho trang quản lý rạp
const TheatersList = () => {
    const [theaters, setTheaters] = useState(sampleTheatersData);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState('all');
    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedTheaters, setSelectedTheaters] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editTheaterId, setEditTheaterId] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteTheaterId, setDeleteTheaterId] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [detailTheaterId, setDetailTheaterId] = useState(null);

    const formRef = useRef(null);
    const theatersPerPage = 8;

    // State cho form thêm/sửa rạp
    const [newTheater, setNewTheater] = useState({
        name: '',
        address: '',
        city: '',
        district: '',
        phone: '',
        email: '',
        opening_time: '',
        screens: '',
        total_seats: '',
        opening_date: '',
        status: 'active',
        facilities: [],
        image: null,
        image_preview: '',
        screen_types: []
    });

    const [errors, setErrors] = useState({});

    // Các loại màn hình có sẵn
    const screenTypeOptions = [
        '2D',
        '3D',
        'IMAX',
        '4DX',
        'Dolby Atmos',
        'ScreenX',
        'VIP'
    ];

    // Các tiện ích có sẵn
    const facilityOptions = [
        {
            id: 'parking',
            name: 'Bãi đỗ xe',
            icon: <FaParking className="mr-2" />
        },
        {
            id: 'food_court',
            name: 'Khu ẩm thực',
            icon: <FaUtensils className="mr-2" />
        },
        {
            id: 'wheelchair',
            name: 'Tiếp cận xe lăn',
            icon: <FaWheelchair className="mr-2" />
        },
        {
            id: 'wifi',
            name: 'Wifi miễn phí',
            icon: <FaWifi className="mr-2" />
        },
        {
            id: 'game_zone',
            name: 'Khu giải trí',
            icon: <FaGamepad className="mr-2" />
        }
    ];

    // Giả lập việc tải dữ liệu từ server
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            // Giả lập việc gọi API
            await new Promise((resolve) => setTimeout(resolve, 800));
            setIsLoading(false);
        };

        loadData();
    }, []);

    // Xử lý thay đổi input cho form
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            if (name.startsWith('facility_')) {
                const facilityId = name.replace('facility_', '');
                let updatedFacilities = [...newTheater.facilities];

                if (checked) {
                    if (!updatedFacilities.includes(facilityId)) {
                        updatedFacilities.push(facilityId);
                    }
                } else {
                    updatedFacilities = updatedFacilities.filter(
                        (id) => id !== facilityId
                    );
                }

                setNewTheater({
                    ...newTheater,
                    facilities: updatedFacilities
                });
            } else if (name.startsWith('screen_type_')) {
                const screenType = name.replace('screen_type_', '');
                let updatedScreenTypes = [...newTheater.screen_types];

                if (checked) {
                    if (!updatedScreenTypes.includes(screenType)) {
                        updatedScreenTypes.push(screenType);
                    }
                } else {
                    updatedScreenTypes = updatedScreenTypes.filter(
                        (type) => type !== screenType
                    );
                }

                setNewTheater({
                    ...newTheater,
                    screen_types: updatedScreenTypes
                });
            }
        } else {
            setNewTheater({
                ...newTheater,
                [name]: value
            });
        }

        // Xóa lỗi khi người dùng bắt đầu chỉnh sửa trường đó
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    // Xử lý tải lên hình ảnh
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Trong ứng dụng thực tế, bạn sẽ gửi file lên server
            // Ở đây chúng ta chỉ tạo một URL tạm thời để xem trước
            const previewUrl = URL.createObjectURL(file);

            setNewTheater({
                ...newTheater,
                image: file,
                image_preview: previewUrl
            });

            if (errors.image) {
                setErrors({
                    ...errors,
                    image: null
                });
            }
        }
    };

    // Xử lý thay đổi trường sắp xếp
    // eslint-disable-next-line
    const handleSortChange = (field) => {
        if (sortField === field) {
            // Nếu đã sắp xếp theo trường này, thay đổi hướng sắp xếp
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // Nếu sắp xếp theo trường mới, mặc định theo thứ tự tăng dần
            setSortField(field);
            setSortDirection('asc');
        }
    };

    // Mở form chi tiết rạp
    const handleOpenDetails = (id) => {
        setDetailTheaterId(id);
        setShowDetails(true);
    };

    // Mở form sửa rạp
    const handleOpenEditForm = (theater) => {
        setEditTheaterId(theater.id);
        setNewTheater({
            name: theater.name,
            address: theater.address,
            city: theater.city,
            district: theater.district,
            phone: theater.phone,
            email: theater.email,
            opening_time: theater.opening_time,
            screens: theater.screens,
            total_seats: theater.total_seats,
            opening_date: theater.opening_date,
            status: theater.status,
            facilities: theater.facilities || [],
            image: null,
            image_preview: theater.image || '',
            screen_types: theater.screen_types || []
        });
        setShowEditForm(true);
        setShowAddForm(false);

        // Scroll to form
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    // Mở hộp thoại xác nhận xóa
    const handleOpenDeleteConfirm = (id) => {
        setDeleteTheaterId(id);
        setShowDeleteConfirm(true);
    };

    // Xử lý xóa rạp
    const handleDeleteTheater = () => {
        setTheaters(
            theaters.filter((theater) => theater.id !== deleteTheaterId)
        );
        setShowDeleteConfirm(false);
        setDeleteTheaterId(null);
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        // Validate các trường bắt buộc
        if (!newTheater.name.trim()) newErrors.name = 'Vui lòng nhập tên rạp';
        if (!newTheater.address.trim())
            newErrors.address = 'Vui lòng nhập địa chỉ';
        if (!newTheater.city) newErrors.city = 'Vui lòng chọn tỉnh/thành phố';
        if (!newTheater.district.trim())
            newErrors.district = 'Vui lòng nhập quận/huyện';
        if (!newTheater.phone.trim())
            newErrors.phone = 'Vui lòng nhập số điện thoại';
        if (!newTheater.email.trim()) newErrors.email = 'Vui lòng nhập email';
        if (!newTheater.opening_time.trim())
            newErrors.opening_time = 'Vui lòng nhập giờ mở cửa';
        if (!newTheater.screens)
            newErrors.screens = 'Vui lòng nhập số phòng chiếu';
        if (!newTheater.total_seats)
            newErrors.total_seats = 'Vui lòng nhập tổng số ghế';
        if (!newTheater.opening_date)
            newErrors.opening_date = 'Vui lòng chọn ngày khai trương';
        if (newTheater.screen_types.length === 0)
            newErrors.screen_types = 'Vui lòng chọn ít nhất một loại màn hình';

        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (newTheater.email && !emailPattern.test(newTheater.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        // Validate phone format
        const phonePattern = /^[0-9\s\-+()]+$/;
        if (newTheater.phone && !phonePattern.test(newTheater.phone)) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }

        // Validate numeric fields
        if (newTheater.screens && isNaN(newTheater.screens)) {
            newErrors.screens = 'Số phòng chiếu phải là số';
        }

        if (newTheater.total_seats && isNaN(newTheater.total_seats)) {
            newErrors.total_seats = 'Tổng số ghế phải là số';
        }

        // Validate image if adding new theater
        if (!showEditForm && !newTheater.image && !newTheater.image_preview) {
            newErrors.image = 'Vui lòng tải lên hình ảnh rạp';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Xử lý thêm rạp mới
    const handleAddTheater = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Tạo rạp mới với ID mới
        const newId = Math.max(...theaters.map((theater) => theater.id)) + 1;

        const theaterToAdd = {
            ...newTheater,
            id: newId,
            image: newTheater.image_preview, // Trong trường hợp thực tế sẽ là URL từ server sau khi upload
            ticket_sales: 0,
            ratings: 0
        };

        // Thêm vào danh sách
        setTheaters([...theaters, theaterToAdd]);

        // Reset form và đóng form
        setNewTheater({
            name: '',
            address: '',
            city: '',
            district: '',
            phone: '',
            email: '',
            opening_time: '',
            screens: '',
            total_seats: '',
            opening_date: '',
            status: 'active',
            facilities: [],
            image: null,
            image_preview: '',
            screen_types: []
        });
        setShowAddForm(false);
    };

    // Xử lý cập nhật rạp
    const handleUpdateTheater = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Cập nhật rạp trong danh sách
        const updatedTheaters = theaters.map((theater) => {
            if (theater.id === editTheaterId) {
                return {
                    ...theater,
                    name: newTheater.name,
                    address: newTheater.address,
                    city: newTheater.city,
                    district: newTheater.district,
                    phone: newTheater.phone,
                    email: newTheater.email,
                    opening_time: newTheater.opening_time,
                    screens: parseInt(newTheater.screens),
                    total_seats: parseInt(newTheater.total_seats),
                    opening_date: newTheater.opening_date,
                    status: newTheater.status,
                    facilities: newTheater.facilities,
                    image: newTheater.image_preview || theater.image, // Giữ nguyên ảnh cũ nếu không thay đổi
                    screen_types: newTheater.screen_types
                };
            }
            return theater;
        });

        setTheaters(updatedTheaters);

        // Reset form và đóng form
        setNewTheater({
            name: '',
            address: '',
            city: '',
            district: '',
            phone: '',
            email: '',
            opening_time: '',
            screens: '',
            total_seats: '',
            opening_date: '',
            status: 'active',
            facilities: [],
            image: null,
            image_preview: '',
            screen_types: []
        });
        setShowEditForm(false);
        setEditTheaterId(null);
    };

    // Xử lý checkbox
    const handleTheaterSelection = (theaterId) => {
        if (selectedTheaters.includes(theaterId)) {
            setSelectedTheaters(
                selectedTheaters.filter((id) => id !== theaterId)
            );
        } else {
            setSelectedTheaters([...selectedTheaters, theaterId]);
        }
    };

    // Xử lý chọn tất cả
    // eslint-disable-next-line
    const handleSelectAllTheaters = () => {
        if (selectedTheaters.length === filteredTheaters.length) {
            setSelectedTheaters([]);
        } else {
            setSelectedTheaters(filteredTheaters.map((theater) => theater.id));
        }
    };

    // Xử lý xóa nhiều rạp
    const handleBulkDelete = () => {
        if (selectedTheaters.length === 0) return;

        if (
            window.confirm(
                `Bạn có chắc chắn muốn xóa ${selectedTheaters.length} rạp đã chọn không?`
            )
        ) {
            setTheaters(
                theaters.filter(
                    (theater) => !selectedTheaters.includes(theater.id)
                )
            );
            setSelectedTheaters([]);
        }
    };

    // Tính toán danh sách rạp đã lọc và sắp xếp
    const filteredTheaters = theaters
        .filter((theater) => {
            // Tìm kiếm theo tên, địa chỉ
            const matchesSearch =
                theater.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                theater.address
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

            // Lọc theo tỉnh/thành phố
            const matchesCity =
                selectedCity === 'all' || theater.city === selectedCity;

            return matchesSearch && matchesCity;
        })
        .sort((a, b) => {
            // Sắp xếp theo trường đã chọn
            if (a[sortField] < b[sortField])
                return sortDirection === 'asc' ? -1 : 1;
            if (a[sortField] > b[sortField])
                return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

    // Tính toán các rạp cho trang hiện tại
    const indexOfLastTheater = currentPage * theatersPerPage;
    const indexOfFirstTheater = indexOfLastTheater - theatersPerPage;
    const currentTheaters = filteredTheaters.slice(
        indexOfFirstTheater,
        indexOfLastTheater
    );

    // Tính tổng số trang
    const totalPages = Math.ceil(filteredTheaters.length / theatersPerPage);

    // Lấy icon trạng thái
    const getStatusIcon = (status) => {
        switch (status) {
            case 'active':
                return (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Hoạt động
                    </span>
                );
            case 'maintenance':
                return (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                        Bảo trì
                    </span>
                );
            case 'closed':
                return (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Đã đóng cửa
                    </span>
                );
            default:
                return (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        Không xác định
                    </span>
                );
        }
    };

    // Lấy tên tiện ích
    const getFacilityName = (facilityId) => {
        const facility = facilityOptions.find(
            (option) => option.id === facilityId
        );
        return facility ? facility.name : facilityId;
    };

    // Lấy icon tiện ích
    const getFacilityIcon = (facilityId) => {
        const facility = facilityOptions.find(
            (option) => option.id === facilityId
        );
        return facility ? facility.icon : null;
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Quản lý Rạp Chiếu Phim
                    </h1>
                    <p className="text-gray-500">
                        Quản lý thông tin các rạp chiếu phim trong hệ thống
                    </p>
                </div>

                <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                    <button
                        onClick={() => {
                            setShowAddForm(!showAddForm);
                            setShowEditForm(false);
                            setShowDetails(false);
                            setNewTheater({
                                name: '',
                                address: '',
                                city: '',
                                district: '',
                                phone: '',
                                email: '',
                                opening_time: '',
                                screens: '',
                                total_seats: '',
                                opening_date: '',
                                status: 'active',
                                facilities: [],
                                image: null,
                                image_preview: '',
                                screen_types: []
                            });
                            setErrors({});

                            // Scroll to form
                            if (!showAddForm) {
                                setTimeout(() => {
                                    formRef.current?.scrollIntoView({
                                        behavior: 'smooth'
                                    });
                                }, 100);
                            }
                        }}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 transition-colors flex items-center"
                    >
                        <FaPlus className="mr-2" />
                        Thêm rạp mới
                    </button>

                    <button
                        onClick={handleBulkDelete}
                        disabled={selectedTheaters.length === 0}
                        className={`px-4 py-2 rounded-lg shadow-sm flex items-center ${
                            selectedTheaters.length === 0
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-red-600 text-white hover:bg-red-700 transition-colors'
                        }`}
                    >
                        <FaTrash className="mr-2" />
                        Xóa đã chọn ({selectedTheaters.length})
                    </button>

                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors flex items-center"
                    >
                        <FaFilter className="mr-2" />
                        Bộ lọc
                        {isFilterOpen ? (
                            <FaChevronUp className="ml-2" />
                        ) : (
                            <FaChevronDown className="ml-2" />
                        )}
                    </button>

                    <div className="dropdown relative">
                        <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors flex items-center">
                            <FaFileExport className="mr-2" />
                            Xuất/Nhập
                            <FaChevronDown className="ml-2" />
                        </button>
                        <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 hidden">
                            <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                <FaFileExport className="mr-2" />
                                Xuất danh sách
                            </button>
                            <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                <FaFileImport className="mr-2" />
                                Nhập danh sách
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chi tiết rạp */}
            {showDetails && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    {theaters
                        .filter((theater) => theater.id === detailTheaterId)
                        .map((theater) => (
                            <div key={theater.id}>
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {theater.name}
                                    </h2>
                                    <button
                                        onClick={() => setShowDetails(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Cột 1: Thông tin cơ bản */}
                                    <div>
                                        <div className="mb-4 overflow-hidden rounded-lg">
                                            <img
                                                src={
                                                    theater.image ||
                                                    'https://via.placeholder.com/400x300'
                                                }
                                                alt={theater.name}
                                                className="w-full h-48 object-cover"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-start">
                                                <FaMapMarkerAlt className="text-gray-500 mt-1 mr-2" />
                                                <div>
                                                    <h4 className="text-sm font-semibold text-gray-700">
                                                        Địa chỉ
                                                    </h4>
                                                    <p className="text-sm text-gray-600">
                                                        {theater.address}
                                                    </p>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        {theater.district},{' '}
                                                        {theater.city}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start">
                                                <FaPhone className="text-gray-500 mt-1 mr-2" />
                                                <div>
                                                    <h4 className="text-sm font-semibold text-gray-700">
                                                        Liên hệ
                                                    </h4>
                                                    <p className="text-sm text-gray-600">
                                                        {theater.phone}
                                                    </p>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        {theater.email}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start">
                                                <FaClock className="text-gray-500 mt-1 mr-2" />
                                                <div>
                                                    <h4 className="text-sm font-semibold text-gray-700">
                                                        Giờ mở cửa
                                                    </h4>
                                                    <p className="text-sm text-gray-600">
                                                        {theater.opening_time}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Cột 2: Thông tin bổ sung */}
                                    <div>
                                        <h3 className="text-md font-semibold text-gray-700 mb-3">
                                            Thông tin chung
                                        </h3>
                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center">
                                                <FaFilm className="text-gray-500 mr-2" />
                                                <h4 className="text-sm font-semibold text-gray-700 mr-2">
                                                    Số phòng chiếu:
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    {theater.screens}
                                                </p>
                                            </div>

                                            <div className="flex items-center">
                                                <IoMdPeople className="text-gray-500 mr-2" />
                                                <h4 className="text-sm font-semibold text-gray-700 mr-2">
                                                    Tổng số ghế:
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    {theater.total_seats}
                                                </p>
                                            </div>

                                            <div className="flex items-center">
                                                <FaStar className="text-gray-500 mr-2" />
                                                <h4 className="text-sm font-semibold text-gray-700 mr-2">
                                                    Đánh giá:
                                                </h4>
                                                <p className="text-sm text-yellow-500">
                                                    {theater.ratings}/5
                                                </p>
                                            </div>

                                            <div className="flex items-center">
                                                <FaTicketAlt className="text-gray-500 mr-2" />
                                                <h4 className="text-sm font-semibold text-gray-700 mr-2">
                                                    Số vé đã bán:
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    {theater.ticket_sales.toLocaleString()}
                                                </p>
                                            </div>

                                            <div className="flex items-center">
                                                <FaCalendarAlt className="text-gray-500 mr-2" />
                                                <h4 className="text-sm font-semibold text-gray-700 mr-2">
                                                    Ngày khai trương:
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    {theater.opening_date}
                                                </p>
                                            </div>

                                            <div className="flex items-center">
                                                <div className="mr-2">
                                                    {getStatusIcon(
                                                        theater.status
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <h3 className="text-md font-semibold text-gray-700 mb-3">
                                            Loại màn hình
                                        </h3>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {theater.screen_types &&
                                                theater.screen_types.map(
                                                    (type, index) => (
                                                        <span
                                                            key={index}
                                                            className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded flex items-center"
                                                        >
                                                            <MdScreenshotMonitor className="mr-1" />
                                                            {type}
                                                        </span>
                                                    )
                                                )}
                                        </div>
                                    </div>

                                    {/* Cột 3: Tiện ích & Hành động */}
                                    <div>
                                        <h3 className="text-md font-semibold text-gray-700 mb-3">
                                            Tiện ích
                                        </h3>
                                        {theater.facilities &&
                                        theater.facilities.length > 0 ? (
                                            <div className="space-y-2 mb-6">
                                                {theater.facilities.map(
                                                    (facility, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center text-sm text-gray-600"
                                                        >
                                                            {getFacilityIcon(
                                                                facility
                                                            )}
                                                            {getFacilityName(
                                                                facility
                                                            )}
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-500 mb-6">
                                                Không có thông tin về tiện ích
                                            </p>
                                        )}

                                        <div className="flex flex-col space-y-2 mt-8">
                                            <button
                                                onClick={() => {
                                                    setShowDetails(false);
                                                    handleOpenEditForm(theater);
                                                }}
                                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
                                            >
                                                <FaEdit className="mr-2" />
                                                Chỉnh sửa rạp
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setShowDetails(false);
                                                    handleOpenDeleteConfirm(
                                                        theater.id
                                                    );
                                                }}
                                                className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center"
                                            >
                                                <FaTrash className="mr-2" />
                                                Xóa rạp
                                            </button>
                                            <Link
                                                to={`/admin/theaters/${theater.id}/rooms`}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                                            >
                                                <MdTheaters className="mr-2" />
                                                Quản lý phòng chiếu
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            )}

            {/* Form Thêm/Sửa rạp */}
            {(showAddForm || showEditForm) && (
                <div
                    ref={formRef}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6"
                >
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        {showEditForm
                            ? 'Chỉnh sửa thông tin rạp'
                            : 'Thêm rạp chiếu phim mới'}
                    </h2>

                    <form
                        onSubmit={
                            showEditForm
                                ? handleUpdateTheater
                                : handleAddTheater
                        }
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Tên rạp */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Tên rạp{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={newTheater.name}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border ${
                                        errors.name
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    placeholder="Nhập tên rạp chiếu phim"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Địa chỉ */}
                            <div>
                                <label
                                    htmlFor="address"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Địa chỉ{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={newTheater.address}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border ${
                                        errors.address
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    placeholder="Nhập địa chỉ đầy đủ"
                                />
                                {errors.address && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.address}
                                    </p>
                                )}
                            </div>

                            {/* Tỉnh/Thành phố */}
                            <div>
                                <label
                                    htmlFor="city"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Tỉnh/Thành phố{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="city"
                                    name="city"
                                    value={newTheater.city}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border ${
                                        errors.city
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                >
                                    <option value="">
                                        Chọn tỉnh/thành phố
                                    </option>
                                    {cities.map((city, index) => (
                                        <option key={index} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                                {errors.city && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.city}
                                    </p>
                                )}
                            </div>

                            {/* Quận/Huyện */}
                            <div>
                                <label
                                    htmlFor="district"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Quận/Huyện{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="district"
                                    name="district"
                                    value={newTheater.district}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border ${
                                        errors.district
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    placeholder="Nhập quận/huyện"
                                />
                                {errors.district && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.district}
                                    </p>
                                )}
                            </div>

                            {/* Số điện thoại */}
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Số điện thoại{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={newTheater.phone}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border ${
                                        errors.phone
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    placeholder="Nhập số điện thoại liên hệ"
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Email{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={newTheater.email}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border ${
                                        errors.email
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    placeholder="Nhập địa chỉ email"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Giờ mở cửa */}
                            <div>
                                <label
                                    htmlFor="opening_time"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Giờ mở cửa{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="opening_time"
                                    name="opening_time"
                                    value={newTheater.opening_time}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border ${
                                        errors.opening_time
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    placeholder="Ví dụ: 09:00 - 24:00"
                                />
                                {errors.opening_time && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.opening_time}
                                    </p>
                                )}
                            </div>

                            {/* Số phòng chiếu */}
                            <div>
                                <label
                                    htmlFor="screens"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Số phòng chiếu{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="screens"
                                    name="screens"
                                    value={newTheater.screens}
                                    onChange={handleInputChange}
                                    min="1"
                                    className={`w-full px-3 py-2 border ${
                                        errors.screens
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    placeholder="Nhập số phòng chiếu"
                                />
                                {errors.screens && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.screens}
                                    </p>
                                )}
                            </div>

                            {/* Tổng số ghế */}
                            <div>
                                <label
                                    htmlFor="total_seats"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Tổng số ghế{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="total_seats"
                                    name="total_seats"
                                    value={newTheater.total_seats}
                                    onChange={handleInputChange}
                                    min="1"
                                    className={`w-full px-3 py-2 border ${
                                        errors.total_seats
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    placeholder="Nhập tổng số ghế"
                                />
                                {errors.total_seats && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.total_seats}
                                    </p>
                                )}
                            </div>

                            {/* Ngày khai trương */}
                            <div>
                                <label
                                    htmlFor="opening_date"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Ngày khai trương{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    id="opening_date"
                                    name="opening_date"
                                    value={newTheater.opening_date}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border ${
                                        errors.opening_date
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                />
                                {errors.opening_date && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.opening_date}
                                    </p>
                                )}
                            </div>

                            {/* Trạng thái */}
                            <div>
                                <label
                                    htmlFor="status"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Trạng thái
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={newTheater.status}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="active">Hoạt động</option>
                                    <option value="maintenance">Bảo trì</option>
                                    <option value="closed">Đã đóng cửa</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Loại màn hình */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Loại màn hình{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div
                                    className={`p-3 border ${
                                        errors.screen_types
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } rounded-md shadow-sm bg-white flex flex-wrap gap-2`}
                                >
                                    {screenTypeOptions.map((type) => (
                                        <div
                                            key={type}
                                            className="flex items-center"
                                        >
                                            <input
                                                type="checkbox"
                                                id={`screen_type_${type}`}
                                                name={`screen_type_${type}`}
                                                checked={newTheater.screen_types.includes(
                                                    type
                                                )}
                                                onChange={handleInputChange}
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            />
                                            <label
                                                htmlFor={`screen_type_${type}`}
                                                className="ml-2 text-sm text-gray-700"
                                            >
                                                {type}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {errors.screen_types && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.screen_types}
                                    </p>
                                )}
                            </div>

                            {/* Tiện ích */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tiện ích
                                </label>
                                <div className="p-3 border border-gray-300 rounded-md shadow-sm bg-white">
                                    <div className="grid grid-cols-2 gap-2">
                                        {facilityOptions.map((facility) => (
                                            <div
                                                key={facility.id}
                                                className="flex items-center"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id={`facility_${facility.id}`}
                                                    name={`facility_${facility.id}`}
                                                    checked={newTheater.facilities.includes(
                                                        facility.id
                                                    )}
                                                    onChange={handleInputChange}
                                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                />
                                                <label
                                                    htmlFor={`facility_${facility.id}`}
                                                    className="ml-2 text-sm text-gray-700 flex items-center"
                                                >
                                                    {facility.icon}
                                                    {facility.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hình ảnh */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Hình ảnh rạp{' '}
                                {!showEditForm && (
                                    <span className="text-red-500">*</span>
                                )}
                            </label>
                            <div className="mt-1 flex flex-col md:flex-row items-start md:items-center gap-4">
                                {/* Image preview */}
                                {newTheater.image_preview ? (
                                    <div className="relative">
                                        <img
                                            src={newTheater.image_preview}
                                            alt="Preview"
                                            className="w-40 h-28 object-cover rounded-lg border border-gray-300"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setNewTheater({
                                                    ...newTheater,
                                                    image: null,
                                                    image_preview: ''
                                                })
                                            }
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="w-40 h-28 flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
                                        <BiCameraMovie className="text-gray-400 text-2xl mb-1" />
                                        <span className="text-gray-500 text-xs text-center">
                                            Chưa có hình ảnh
                                        </span>
                                    </div>
                                )}

                                {/* Upload button */}
                                <div>
                                    <div>
                                        <label
                                            htmlFor="image-upload"
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer flex items-center"
                                        >
                                            <FaUpload className="mr-2" />
                                            {newTheater.image_preview
                                                ? 'Thay đổi hình ảnh'
                                                : 'Tải lên hình ảnh'}
                                            <input
                                                id="image-upload"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Định dạng PNG, JPG. Kích thước tối đa
                                        5MB.
                                    </p>
                                </div>
                            </div>
                            {errors.image && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.image}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowAddForm(false);
                                    setShowEditForm(false);
                                    setNewTheater({
                                        name: '',
                                        address: '',
                                        city: '',
                                        district: '',
                                        phone: '',
                                        email: '',
                                        opening_time: '',
                                        screens: '',
                                        total_seats: '',
                                        opening_date: '',
                                        status: 'active',
                                        facilities: [],
                                        image: null,
                                        image_preview: '',
                                        screen_types: []
                                    });
                                    setErrors({});
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center"
                            >
                                <FaTimes className="mr-2" />
                                Hủy
                            </button>

                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                            >
                                <FaSave className="mr-2" />
                                {showEditForm ? 'Cập nhật' : 'Thêm mới'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-200">
                <div className="p-4">
                    {/* Search */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm rạp theo tên, địa chỉ..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <FaSearch className="text-gray-400" />
                        </div>
                    </div>

                    {/* Filter Panel */}
                    {isFilterOpen && (
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Filter by City */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tỉnh/Thành phố
                                </label>
                                <select
                                    value={selectedCity}
                                    onChange={(e) =>
                                        setSelectedCity(e.target.value)
                                    }
                                    className="w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="all">
                                        Tất cả tỉnh/thành phố
                                    </option>
                                    {cities.map((city, index) => (
                                        <option key={index} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Sort */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Sắp xếp theo
                                </label>
                                <select
                                    value={`${sortField}-${sortDirection}`}
                                    onChange={(e) => {
                                        const [field, direction] =
                                            e.target.value.split('-');
                                        setSortField(field);
                                        setSortDirection(direction);
                                    }}
                                    className="w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="name-asc">
                                        Tên rạp (A-Z)
                                    </option>
                                    <option value="name-desc">
                                        Tên rạp (Z-A)
                                    </option>
                                    <option value="city-asc">
                                        Tỉnh/Thành phố (A-Z)
                                    </option>
                                    <option value="screens-desc">
                                        Số phòng chiếu (Cao - Thấp)
                                    </option>
                                    <option value="total_seats-desc">
                                        Tổng số ghế (Cao - Thấp)
                                    </option>
                                    <option value="opening_date-desc">
                                        Ngày khai trương (Mới nhất)
                                    </option>
                                    <option value="ticket_sales-desc">
                                        Lượt bán vé (Cao - Thấp)
                                    </option>
                                    <option value="ratings-desc">
                                        Đánh giá (Cao - Thấp)
                                    </option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                {/* Filter info */}
                <div className="border-t border-gray-200 px-4 py-3 bg-gray-50 text-sm flex flex-wrap items-center justify-between rounded-b-lg">
                    <div className="text-gray-500">
                        Hiển thị{' '}
                        <span className="font-medium text-gray-900">
                            {currentTheaters.length}
                        </span>{' '}
                        rạp trong tổng số{' '}
                        <span className="font-medium text-gray-900">
                            {filteredTheaters.length}
                        </span>{' '}
                        rạp
                        {selectedCity !== 'all' && (
                            <span>
                                {' '}
                                tại{' '}
                                <span className="font-medium text-indigo-600">
                                    {selectedCity}
                                </span>
                            </span>
                        )}
                    </div>

                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setSelectedCity('all');
                            setSortField('name');
                            setSortDirection('asc');
                        }}
                        className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                    >
                        <FaSync className="mr-1" />
                        Đặt lại bộ lọc
                    </button>
                </div>
            </div>

            {/* Theaters List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
                {isLoading ? (
                    // Loading state
                    [...Array(8)].map((_, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                        >
                            <div className="animate-pulse">
                                <div className="h-48 bg-gray-200"></div>
                                <div className="p-4">
                                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                    <div className="h-10 bg-gray-200 rounded mt-4"></div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : currentTheaters.length === 0 ? (
                    // Empty state
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <div className="flex flex-col items-center justify-center">
                            <FaSearch className="text-gray-300 text-5xl mb-4" />
                            <h3 className="text-xl font-medium text-gray-700 mb-2">
                                Không tìm thấy rạp nào
                            </h3>
                            <p className="text-gray-500 text-center max-w-md">
                                Không có rạp nào phù hợp với tìm kiếm của bạn.
                                Hãy thử thay đổi bộ lọc hoặc thêm rạp mới.
                            </p>
                            <button
                                onClick={() => {
                                    setShowAddForm(true);
                                    setShowEditForm(false);
                                    setNewTheater({
                                        name: '',
                                        address: '',
                                        city: '',
                                        district: '',
                                        phone: '',
                                        email: '',
                                        opening_time: '',
                                        screens: '',
                                        total_seats: '',
                                        opening_date: '',
                                        status: 'active',
                                        facilities: [],
                                        image: null,
                                        image_preview: '',
                                        screen_types: []
                                    });
                                    setErrors({});

                                    setTimeout(() => {
                                        formRef.current?.scrollIntoView({
                                            behavior: 'smooth'
                                        });
                                    }, 100);
                                }}
                                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                            >
                                <FaPlus className="mr-2" />
                                Thêm rạp mới
                            </button>
                        </div>
                    </div>
                ) : (
                    // Theater cards
                    currentTheaters.map((theater) => (
                        <div
                            key={theater.id}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full"
                        >
                            {/* Theater Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={
                                        theater.image ||
                                        'https://via.placeholder.com/400x300'
                                    }
                                    alt={theater.name}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-0 left-0 right-0 p-2 flex justify-between">
                                    <input
                                        type="checkbox"
                                        checked={selectedTheaters.includes(
                                            theater.id
                                        )}
                                        onChange={() =>
                                            handleTheaterSelection(theater.id)
                                        }
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <div>{getStatusIcon(theater.status)}</div>
                                </div>
                            </div>

                            {/* Theater Info */}
                            <div className="p-4 flex-1 flex flex-col">
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                    {theater.name}
                                </h3>
                                <div className="text-sm text-gray-500 mb-2 flex items-start">
                                    <FaMapMarkerAlt className="mt-1 mr-1 flex-shrink-0" />
                                    <span>
                                        {theater.district}, {theater.city}
                                    </span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600 mb-1">
                                    <FaFilm className="mr-2" />
                                    <span>
                                        {theater.screens} phòng chiếu |{' '}
                                        {theater.total_seats} ghế
                                    </span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600 mb-3">
                                    <FaClock className="mr-2" />
                                    <span>{theater.opening_time}</span>
                                </div>

                                {/* Screen Types */}
                                <div className="flex flex-wrap gap-1 mb-3">
                                    {theater.screen_types &&
                                        theater.screen_types.map(
                                            (type, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
                                                >
                                                    {type}
                                                </span>
                                            )
                                        )}
                                </div>

                                <div className="mt-auto">
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="flex items-center">
                                            <FaStar className="text-yellow-400 mr-1" />
                                            <span className="text-sm font-medium">
                                                {theater.ratings}/5
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {theater.ticket_sales.toLocaleString()}{' '}
                                            vé đã bán
                                        </div>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() =>
                                                handleOpenDetails(theater.id)
                                            }
                                            className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                                        >
                                            <FaEye className="mr-1" />
                                            Chi tiết
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleOpenEditForm(theater)
                                            }
                                            className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
                                        >
                                            <FaEdit className="mr-1" />
                                            Sửa
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleOpenDeleteConfirm(
                                                    theater.id
                                                )
                                            }
                                            className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-3 flex items-center justify-between">
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Hiển thị{' '}
                                <span className="font-medium">
                                    {indexOfFirstTheater + 1}
                                </span>{' '}
                                đến{' '}
                                <span className="font-medium">
                                    {Math.min(
                                        indexOfLastTheater,
                                        filteredTheaters.length
                                    )}
                                </span>{' '}
                                trong tổng số{' '}
                                <span className="font-medium">
                                    {filteredTheaters.length}
                                </span>{' '}
                                rạp
                            </p>
                        </div>
                        <div>
                            <nav
                                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                aria-label="Pagination"
                            >
                                <button
                                    onClick={() =>
                                        setCurrentPage(
                                            Math.max(1, currentPage - 1)
                                        )
                                    }
                                    disabled={currentPage === 1}
                                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-500 hover:bg-gray-50'} text-sm font-medium`}
                                >
                                    <span className="sr-only">Previous</span>
                                    &laquo; Trước
                                </button>
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            setCurrentPage(index + 1)
                                        }
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === index + 1 ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() =>
                                        setCurrentPage(
                                            Math.min(
                                                totalPages,
                                                currentPage + 1
                                            )
                                        )
                                    }
                                    disabled={currentPage === totalPages}
                                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-500 hover:bg-gray-50'} text-sm font-medium`}
                                >
                                    <span className="sr-only">Next</span>
                                    Tiếp &raquo;
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="p-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-red-100 rounded-full p-3">
                                    <FaExclamationTriangle className="text-red-600 text-xl" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Xác nhận xóa rạp
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Bạn có chắc chắn muốn xóa rạp này?
                                            Hành động này không thể hoàn tác và
                                            sẽ xóa tất cả dữ liệu liên quan đến
                                            rạp này, bao gồm cả phòng chiếu và
                                            lịch chiếu.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDeleteTheater}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TheatersList;
