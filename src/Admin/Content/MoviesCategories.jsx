import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaSearch,
    FaSave,
    FaTimes,
    FaSort,
    FaChevronDown,
    FaChevronUp,
    FaFileExport,
    FaFileImport,
    FaSync,
    FaCheck,
    FaExclamationTriangle,
    FaArrowLeft
} from 'react-icons/fa';

// Dữ liệu mẫu các loại phim
const sampleCategoriesData = [
    {
        id: 1,
        name: 'Hành động',
        name_en: 'Action',
        slug: 'hanh-dong',
        movies_count: 28,
        status: 'active',
        description: 'Phim có nhiều cảnh chiến đấu, rượt đuổi và bạo lực',
        created_at: '2022-03-15'
    },
    {
        id: 2,
        name: 'Phiêu lưu',
        name_en: 'Adventure',
        slug: 'phieu-luu',
        movies_count: 18,
        status: 'active',
        description: 'Phim kể về những cuộc phiêu lưu, khám phá',
        created_at: '2022-03-15'
    },
    {
        id: 3,
        name: 'Hoạt hình',
        name_en: 'Animation',
        slug: 'hoat-hinh',
        movies_count: 24,
        status: 'active',
        description: 'Phim được tạo ra bằng kỹ thuật hoạt hình',
        created_at: '2022-03-15'
    },
    {
        id: 4,
        name: 'Hài',
        name_en: 'Comedy',
        slug: 'hai',
        movies_count: 32,
        status: 'active',
        description: 'Phim có nhiều tình huống hài hước',
        created_at: '2022-03-15'
    },
    {
        id: 5,
        name: 'Tội phạm',
        name_en: 'Crime',
        slug: 'toi-pham',
        movies_count: 15,
        status: 'active',
        description: 'Phim về thế giới tội phạm, mafia',
        created_at: '2022-03-16'
    },
    {
        id: 6,
        name: 'Tài liệu',
        name_en: 'Documentary',
        slug: 'tai-lieu',
        movies_count: 8,
        status: 'active',
        description: 'Phim dựa trên sự kiện, nhân vật có thật',
        created_at: '2022-03-16'
    },
    {
        id: 7,
        name: 'Chính kịch',
        name_en: 'Drama',
        slug: 'chinh-kich',
        movies_count: 45,
        status: 'active',
        description: 'Phim tập trung vào câu chuyện xã hội, tâm lý nhân vật',
        created_at: '2022-03-16'
    },
    {
        id: 8,
        name: 'Gia đình',
        name_en: 'Family',
        slug: 'gia-dinh',
        movies_count: 12,
        status: 'active',
        description: 'Phim phù hợp cho mọi lứa tuổi trong gia đình',
        created_at: '2022-03-17'
    },
    {
        id: 9,
        name: 'Giả tưởng',
        name_en: 'Fantasy',
        slug: 'gia-tuong',
        movies_count: 21,
        status: 'active',
        description: 'Phim có yếu tố kỳ ảo, thần thoại',
        created_at: '2022-03-17'
    },
    {
        id: 10,
        name: 'Lịch sử',
        name_en: 'History',
        slug: 'lich-su',
        movies_count: 7,
        status: 'active',
        description: 'Phim dựa trên các sự kiện lịch sử',
        created_at: '2022-03-17'
    },
    {
        id: 11,
        name: 'Kinh dị',
        name_en: 'Horror',
        slug: 'kinh-di',
        movies_count: 19,
        status: 'active',
        description: 'Phim gây cảm giác sợ hãi, ám ảnh',
        created_at: '2022-03-18'
    },
    {
        id: 12,
        name: 'Nhạc',
        name_en: 'Music',
        slug: 'nhac',
        movies_count: 5,
        status: 'active',
        description: 'Phim có yếu tố âm nhạc, ca hát',
        created_at: '2022-03-18'
    },
    {
        id: 13,
        name: 'Bí ẩn',
        name_en: 'Mystery',
        slug: 'bi-an',
        movies_count: 14,
        status: 'active',
        description: 'Phim xoay quanh những bí ẩn, câu đố cần giải mã',
        created_at: '2022-03-18'
    },
    {
        id: 14,
        name: 'Lãng mạn',
        name_en: 'Romance',
        slug: 'lang-man',
        movies_count: 22,
        status: 'active',
        description: 'Phim về tình yêu, mối quan hệ tình cảm',
        created_at: '2022-03-19'
    },
    {
        id: 15,
        name: 'Khoa học viễn tưởng',
        name_en: 'Science Fiction',
        slug: 'khoa-hoc-vien-tuong',
        movies_count: 16,
        status: 'active',
        description: 'Phim với bối cảnh tương lai, công nghệ cao',
        created_at: '2022-03-19'
    },
    {
        id: 16,
        name: 'Viễn Tây',
        name_en: 'Western',
        slug: 'vien-tay',
        movies_count: 3,
        status: 'inactive',
        description: 'Phim về cao bồi miền Tây nước Mỹ',
        created_at: '2022-03-20'
    },
    {
        id: 17,
        name: 'Giật gân',
        name_en: 'Thriller',
        slug: 'giat-gan',
        movies_count: 18,
        status: 'active',
        description: 'Phim có yếu tố gây căng thẳng, hồi hộp cho người xem',
        created_at: '2022-03-20'
    },
    {
        id: 18,
        name: 'Chiến tranh',
        name_en: 'War',
        slug: 'chien-tranh',
        movies_count: 6,
        status: 'active',
        description: 'Phim về chiến tranh và những tác động của nó',
        created_at: '2022-03-20'
    }
];

// Component chính cho trang quản lý loại phim
const MoviesCategories = () => {
    const [categories, setCategories] = useState(sampleCategoriesData);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteCategoryId, setDeleteCategoryId] = useState(null);

    const [newCategory, setNewCategory] = useState({
        name: '',
        name_en: '',
        slug: '',
        description: '',
        status: 'active'
    });

    const [errors, setErrors] = useState({});

    const formRef = useRef(null);
    const categoriesPerPage = 10;

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

    // Tính toán URL slug dựa trên tên tiếng Việt
    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-');
    };

    // Xử lý thay đổi input của form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCategory({
            ...newCategory,
            [name]: value
        });

        // Nếu đang sửa tên, tự động cập nhật slug
        if (name === 'name' && !showEditForm) {
            setNewCategory({
                ...newCategory,
                name: value,
                slug: generateSlug(value)
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

    // Xử lý thay đổi trường sắp xếp
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

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        // Validate các trường bắt buộc
        if (!newCategory.name.trim())
            newErrors.name = 'Vui lòng nhập tên loại phim';
        if (!newCategory.name_en.trim())
            newErrors.name_en = 'Vui lòng nhập tên tiếng Anh';
        if (!newCategory.slug.trim())
            newErrors.slug = 'Vui lòng nhập đường dẫn slug';

        // Kiểm tra trùng lặp tên và slug (nếu đang thêm mới)
        if (!showEditForm) {
            if (
                categories.some(
                    (cat) =>
                        cat.name.toLowerCase() ===
                        newCategory.name.toLowerCase()
                )
            ) {
                newErrors.name = 'Tên loại phim đã tồn tại';
            }

            if (
                categories.some(
                    (cat) =>
                        cat.slug.toLowerCase() ===
                        newCategory.slug.toLowerCase()
                )
            ) {
                newErrors.slug = 'Đường dẫn slug đã tồn tại';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Xử lý thêm loại phim mới
    const handleAddCategory = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Tạo loại phim mới với ID mới
        const newId = Math.max(...categories.map((cat) => cat.id)) + 1;
        const today = new Date().toISOString().split('T')[0];

        const categoryToAdd = {
            ...newCategory,
            id: newId,
            movies_count: 0,
            created_at: today
        };

        // Thêm vào danh sách
        setCategories([...categories, categoryToAdd]);

        // Reset form và đóng form
        setNewCategory({
            name: '',
            name_en: '',
            slug: '',
            description: '',
            status: 'active'
        });
        setShowAddForm(false);
    };

    // Mở form edit với dữ liệu đã có
    const handleOpenEditForm = (category) => {
        setEditCategoryId(category.id);
        setNewCategory({
            name: category.name,
            name_en: category.name_en,
            slug: category.slug,
            description: category.description || '',
            status: category.status
        });
        setShowEditForm(true);
        setShowAddForm(false);

        // Scroll to form
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    // Xử lý lưu loại phim đã sửa
    const handleUpdateCategory = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Cập nhật loại phim trong danh sách
        const updatedCategories = categories.map((cat) =>
            cat.id === editCategoryId ? { ...cat, ...newCategory } : cat
        );

        setCategories(updatedCategories);

        // Reset form và đóng form
        setNewCategory({
            name: '',
            name_en: '',
            slug: '',
            description: '',
            status: 'active'
        });
        setShowEditForm(false);
        setEditCategoryId(null);
    };

    // Mở hộp thoại xác nhận xóa
    const handleOpenDeleteConfirm = (id) => {
        setDeleteCategoryId(id);
        setShowDeleteConfirm(true);
    };

    // Xử lý xóa loại phim
    const handleDeleteCategory = () => {
        // Nếu loại phim đã có phim liên kết
        const categoryToDelete = categories.find(
            (cat) => cat.id === deleteCategoryId
        );
        if (categoryToDelete && categoryToDelete.movies_count > 0) {
            // Hiển thị cảnh báo hoặc đặt trạng thái 'inactive' thay vì xóa
            const updatedCategories = categories.map((cat) =>
                cat.id === deleteCategoryId
                    ? { ...cat, status: 'inactive' }
                    : cat
            );
            setCategories(updatedCategories);
        } else {
            // Xóa khỏi danh sách
            setCategories(
                categories.filter((cat) => cat.id !== deleteCategoryId)
            );
        }

        // Đóng hộp thoại xác nhận
        setShowDeleteConfirm(false);
        setDeleteCategoryId(null);
    };

    // Xử lý checkbox
    const handleCategorySelection = (categoryId) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(
                selectedCategories.filter((id) => id !== categoryId)
            );
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };

    // Xử lý chọn tất cả
    const handleSelectAllCategories = () => {
        if (selectedCategories.length === filteredCategories.length) {
            setSelectedCategories([]);
        } else {
            setSelectedCategories(filteredCategories.map((cat) => cat.id));
        }
    };

    // Xử lý xóa nhiều loại phim (giả lập)
    const handleBulkDelete = () => {
        if (selectedCategories.length === 0) return;

        if (
            window.confirm(
                `Bạn có chắc chắn muốn xóa ${selectedCategories.length} loại phim đã chọn không?`
            )
        ) {
            // Kiểm tra nếu có loại phim đã có phim liên kết
            const categoriesToInactive = selectedCategories.filter(
                (id) =>
                    categories.find((cat) => cat.id === id)?.movies_count > 0
            );

            let updatedCategories = [...categories];

            // Đặt trạng thái 'inactive' cho loại phim đã có phim liên kết
            if (categoriesToInactive.length > 0) {
                updatedCategories = updatedCategories.map((cat) =>
                    categoriesToInactive.includes(cat.id)
                        ? { ...cat, status: 'inactive' }
                        : cat
                );
            }

            // Xóa các loại phim chưa có phim liên kết
            const categoriesToDelete = selectedCategories.filter(
                (id) => !categoriesToInactive.includes(id)
            );

            if (categoriesToDelete.length > 0) {
                updatedCategories = updatedCategories.filter(
                    (cat) => !categoriesToDelete.includes(cat.id)
                );
            }

            setCategories(updatedCategories);
            setSelectedCategories([]);
        }
    };

    // Tính toán danh sách loại phim đã lọc và sắp xếp
    const filteredCategories = categories
        .filter((category) => {
            // Tìm kiếm theo tên hoặc tên tiếng Anh
            return (
                category.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                category.name_en
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );
        })
        .sort((a, b) => {
            // Sắp xếp theo trường đã chọn
            if (a[sortField] < b[sortField])
                return sortDirection === 'asc' ? -1 : 1;
            if (a[sortField] > b[sortField])
                return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

    // Tính toán các loại phim cho trang hiện tại
    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = filteredCategories.slice(
        indexOfFirstCategory,
        indexOfLastCategory
    );

    // Tính tổng số trang
    const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div className="flex items-center">
                    <Link
                        to="/admin/movies"
                        className="text-gray-600 hover:text-indigo-600 mr-4"
                    >
                        <FaArrowLeft />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Quản lý Loại Phim
                        </h1>
                        <p className="text-gray-500">
                            Quản lý các thể loại phim trong hệ thống
                        </p>
                    </div>
                </div>

                <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                    <button
                        onClick={() => {
                            setShowAddForm(!showAddForm);
                            setShowEditForm(false);
                            setNewCategory({
                                name: '',
                                name_en: '',
                                slug: '',
                                description: '',
                                status: 'active'
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
                        Thêm loại phim mới
                    </button>

                    <button
                        onClick={handleBulkDelete}
                        disabled={selectedCategories.length === 0}
                        className={`px-4 py-2 rounded-lg shadow-sm flex items-center ${
                            selectedCategories.length === 0
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-red-600 text-white hover:bg-red-700 transition-colors'
                        }`}
                    >
                        <FaTrash className="mr-2" />
                        Xóa đã chọn ({selectedCategories.length})
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

            {/* Form Thêm/Sửa loại phim */}
            {(showAddForm || showEditForm) && (
                <div
                    ref={formRef}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6"
                >
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        {showEditForm
                            ? 'Chỉnh sửa loại phim'
                            : 'Thêm loại phim mới'}
                    </h2>

                    <form
                        onSubmit={
                            showEditForm
                                ? handleUpdateCategory
                                : handleAddCategory
                        }
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Tên loại phim */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Tên loại phim (Tiếng Việt){' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={newCategory.name}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border ${
                                        errors.name
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    placeholder="Nhập tên loại phim bằng tiếng Việt"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Tên tiếng Anh */}
                            <div>
                                <label
                                    htmlFor="name_en"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Tên tiếng Anh{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name_en"
                                    name="name_en"
                                    value={newCategory.name_en}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border ${
                                        errors.name_en
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    placeholder="Nhập tên loại phim bằng tiếng Anh"
                                />
                                {errors.name_en && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.name_en}
                                    </p>
                                )}
                            </div>

                            {/* URL Slug */}
                            <div>
                                <label
                                    htmlFor="slug"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Đường dẫn slug{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="slug"
                                    name="slug"
                                    value={newCategory.slug}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border ${
                                        errors.slug
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    placeholder="vd: hanh-dong"
                                />
                                {errors.slug && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.slug}
                                    </p>
                                )}
                                <p className="mt-1 text-xs text-gray-500">
                                    Slug sẽ được sử dụng trong URL:
                                    domain.com/the-loai/{'{slug}'}
                                </p>
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
                                    value={newCategory.status}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="active">Hoạt động</option>
                                    <option value="inactive">
                                        Không hoạt động
                                    </option>
                                </select>
                            </div>

                            {/* Mô tả */}
                            <div className="md:col-span-2">
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Mô tả
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={newCategory.description}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Mô tả về loại phim này"
                                ></textarea>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowAddForm(false);
                                    setShowEditForm(false);
                                    setNewCategory({
                                        name: '',
                                        name_en: '',
                                        slug: '',
                                        description: '',
                                        status: 'active'
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
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm loại phim..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <FaSearch className="text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Filter info */}
                <div className="border-t border-gray-200 px-4 py-3 bg-gray-50 text-sm flex flex-wrap items-center justify-between rounded-b-lg">
                    <div className="text-gray-500">
                        Hiển thị{' '}
                        <span className="font-medium text-gray-900">
                            {currentCategories.length}
                        </span>{' '}
                        loại phim trong tổng số{' '}
                        <span className="font-medium text-gray-900">
                            {filteredCategories.length}
                        </span>{' '}
                        loại phim
                    </div>

                    <button
                        onClick={() => {
                            setSearchTerm('');
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

            {/* Categories Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 mb-6">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-4 py-3 text-left">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={
                                                filteredCategories.length > 0 &&
                                                selectedCategories.length ===
                                                    filteredCategories.length
                                            }
                                            onChange={handleSelectAllCategories}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    <div
                                        className="flex items-center cursor-pointer"
                                        onClick={() => handleSortChange('name')}
                                    >
                                        Tên loại phim
                                        {sortField === 'name' && (
                                            <span className="ml-1">
                                                {sortDirection === 'asc' ? (
                                                    <FaChevronUp />
                                                ) : (
                                                    <FaChevronDown />
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    <div
                                        className="flex items-center cursor-pointer"
                                        onClick={() =>
                                            handleSortChange('name_en')
                                        }
                                    >
                                        Tên tiếng Anh
                                        {sortField === 'name_en' && (
                                            <span className="ml-1">
                                                {sortDirection === 'asc' ? (
                                                    <FaChevronUp />
                                                ) : (
                                                    <FaChevronDown />
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Đường dẫn slug
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    <div
                                        className="flex items-center justify-center cursor-pointer"
                                        onClick={() =>
                                            handleSortChange('movies_count')
                                        }
                                    >
                                        Số phim
                                        {sortField === 'movies_count' && (
                                            <span className="ml-1">
                                                {sortDirection === 'asc' ? (
                                                    <FaChevronUp />
                                                ) : (
                                                    <FaChevronDown />
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Trạng thái
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {isLoading ? (
                                // Loading state
                                [...Array(5)].map((_, index) => (
                                    <tr key={index}>
                                        <td colSpan="7" className="px-4 py-4">
                                            <div className="animate-pulse flex items-center space-x-4">
                                                <div className="rounded bg-gray-200 h-4 w-4"></div>
                                                <div className="flex-1 space-y-2">
                                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : currentCategories.length === 0 ? (
                                // Empty state
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="px-4 py-8 text-center text-gray-500"
                                    >
                                        <div className="flex flex-col items-center">
                                            <FaSearch className="text-gray-300 text-4xl mb-3" />
                                            <p className="text-lg font-medium">
                                                Không tìm thấy loại phim nào
                                            </p>
                                            <p className="text-sm">
                                                Thử thay đổi từ khóa tìm kiếm
                                                hoặc thêm loại phim mới
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                // Category rows
                                currentCategories.map((category) => (
                                    <tr
                                        key={category.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(
                                                    category.id
                                                )}
                                                onChange={() =>
                                                    handleCategorySelection(
                                                        category.id
                                                    )
                                                }
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {category.name}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {category.created_at}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm text-gray-900">
                                                {category.name_en}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm text-gray-500 font-mono">
                                                {category.slug}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                {category.movies_count}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    category.status === 'active'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}
                                            >
                                                {category.status === 'active'
                                                    ? 'Hoạt động'
                                                    : 'Không hoạt động'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-center">
                                            <div className="flex items-center justify-center space-x-3">
                                                <button
                                                    onClick={() =>
                                                        handleOpenEditForm(
                                                            category
                                                        )
                                                    }
                                                    className="text-blue-600 hover:text-blue-900"
                                                    title="Chỉnh sửa"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleOpenDeleteConfirm(
                                                            category.id
                                                        )
                                                    }
                                                    className={`text-red-600 hover:text-red-900 ${
                                                        category.movies_count >
                                                        0
                                                            ? 'opacity-50 cursor-not-allowed'
                                                            : ''
                                                    }`}
                                                    title={
                                                        category.movies_count >
                                                        0
                                                            ? 'Không thể xóa vì đã có phim liên kết'
                                                            : 'Xóa'
                                                    }
                                                    disabled={
                                                        category.movies_count >
                                                        0
                                                    }
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {!isLoading && totalPages > 1 && (
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Hiển thị{' '}
                                    <span className="font-medium">
                                        {indexOfFirstCategory + 1}
                                    </span>{' '}
                                    đến{' '}
                                    <span className="font-medium">
                                        {Math.min(
                                            indexOfLastCategory,
                                            filteredCategories.length
                                        )}
                                    </span>{' '}
                                    trong tổng số{' '}
                                    <span className="font-medium">
                                        {filteredCategories.length}
                                    </span>{' '}
                                    loại phim
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
                                        <span className="sr-only">
                                            Previous
                                        </span>
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
            </div>

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
                                        Xác nhận xóa loại phim
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Bạn có chắc chắn muốn xóa loại phim
                                            này? Hành động này không thể hoàn
                                            tác.
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
                                    onClick={handleDeleteCategory}
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

export default MoviesCategories;
