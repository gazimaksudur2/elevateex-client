import { useState, useMemo } from "react";
import { ScrollRestoration } from "react-router-dom";
import { HiOutlineSearch, HiOutlineAdjustments, HiOutlineSortDescending } from "react-icons/hi";
import ClassCards from "../../components/AllClasses/ClassCards";
import useClass from "../../hooks/useClass";

const AllClasses = () => {
  const [classes] = useClass({ query: "?course_status=approved" });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState("all");

  const categories = useMemo(() => {
    const cats = [...new Set(classes.map((c) => c.course_type).filter(Boolean))];
    return ["all", ...cats];
  }, [classes]);

  const filtered = useMemo(() => {
    let result = [...classes];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (c) =>
          c.course_title?.toLowerCase().includes(term) ||
          c.instructor?.toLowerCase().includes(term) ||
          c.course_type?.toLowerCase().includes(term)
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((c) => c.course_type === selectedCategory);
    }

    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      result = result.filter((c) => {
        const fee = parseFloat(c.course_fee) || 0;
        return fee >= min && (max ? fee <= max : true);
      });
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => (parseFloat(a.course_fee) || 0) - (parseFloat(b.course_fee) || 0));
        break;
      case "price-high":
        result.sort((a, b) => (parseFloat(b.course_fee) || 0) - (parseFloat(a.course_fee) || 0));
        break;
      case "popular":
        result.sort((a, b) => (b.total_enrollment || 0) - (a.total_enrollment || 0));
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    return result;
  }, [classes, searchTerm, selectedCategory, sortBy, priceRange]);

  return (
    <div className="min-h-screen bg-surface-50">
      <ScrollRestoration />

      <div className="bg-gradient-to-br from-brand-600 to-brand-800 text-white py-16">
        <div className="section-container text-center">
          <h1 className="text-display-sm md:text-display-md font-display font-bold mb-4">
            Explore Our Course Catalog
          </h1>
          <p className="text-lg text-brand-100 max-w-2xl mx-auto mb-8">
            Browse {classes.length}+ courses across multiple categories, taught by expert instructors.
          </p>

          <div className="max-w-2xl mx-auto relative">
            <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400 text-xl" />
            <input
              type="text"
              placeholder="Search courses, instructors, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-surface-900 bg-white rounded-2xl border-0 shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-300"
            />
          </div>
        </div>
      </div>

      <div className="section-container py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            {categories.slice(0, 8).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                  selectedCategory === cat
                    ? "bg-brand-600 text-white shadow-sm"
                    : "bg-white text-surface-600 border border-surface-200 hover:border-brand-300 hover:text-brand-600"
                }`}
              >
                {cat === "all" ? "All Categories" : cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <HiOutlineAdjustments className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="pl-9 pr-4 py-2.5 text-sm bg-white border border-surface-200 rounded-xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="all">All Prices</option>
                <option value="0-50">Under $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="100-200">$100 - $200</option>
                <option value="200-99999">$200+</option>
              </select>
            </div>

            <div className="relative">
              <HiOutlineSortDescending className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-9 pr-4 py-2.5 text-sm bg-white border border-surface-200 rounded-xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <p className="text-sm text-surface-500 mb-6">
          Showing <span className="font-semibold text-surface-900">{filtered.length}</span> courses
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course, idx) => (
            <ClassCards key={course._id || idx} course={course} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-surface-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <HiOutlineSearch className="text-2xl text-surface-400" />
            </div>
            <h3 className="text-lg font-semibold text-surface-900 mb-1">No courses found</h3>
            <p className="text-surface-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllClasses;
