import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, Tag } from 'lucide-react';

interface BlogPost {
	slug: string;
	title: string;
	excerpt: string;
	image: string;
	author: string;
	date: string;
	category: string;
}

interface Category {
	name: string;
	count: number;
}

const BlogPage: React.FC = () => {
		const [searchQuery, setSearchQuery] = useState('');
		const [selectedCategory, setSelectedCategory] = useState('All');
		const [currentPage, setCurrentPage] = useState(1);
		const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
		const [categories, setCategories] = useState<Category[]>([]);
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState<string | null>(null);

		const postsPerPage = 6;

		useEffect(() => {
			const fetchBlogData = async () => {
				try {
					const response = await fetch(`/api/posts/`);
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}
					const data = await response.json();
					setBlogPosts(data);

					const categoryCounts = data.reduce(
						(acc: Record<string, number>, post: BlogPost) => {
							acc[post.category] = (acc[post.category] || 0) + 1;
							return acc;
						},
						{}
					);

					setCategories([
						{ name: 'All', count: data.length },
						...Object.entries(categoryCounts).map(([name, count]) => ({
							name,
							count,
						})),
					]);

					setLoading(false);
				} catch (err) {
					setError('Failed to fetch blog posts. Please try again later.');
					setLoading(false);
				}
			};

			fetchBlogData();
		}, []);

		if (loading) {
			return <p>Loading...</p>;
		}

		if (error) {
			return <p>{error}</p>;
		}

		const filteredPosts = blogPosts.filter((post) => {
			const matchesSearch =
				post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesCategory =
				selectedCategory === 'All' || post.category === selectedCategory;
			return matchesSearch && matchesCategory;
		});

		const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
		const currentPosts = filteredPosts.slice(
			(currentPage - 1) * postsPerPage,
			currentPage * postsPerPage
		);

		return (
			<div className="min-h-screen pt-24 pb-16 bg-black">
				<div className="container mx-auto px-4">
					{/* Header */}
					<div className="text-center mb-12">
						<h1 className="font-play text-4xl md:text-5xl font-bold text-white mb-4">
							ZRG <span className="text-gold">Blog</span>
						</h1>
						<p className="text-gray-400 max-w-2xl mx-auto">
							Stay updated with the latest FiveM development tips, tutorials, and
							community news
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
						{/* Sidebar */}
						<div className="lg:col-span-1">
							{/* Search */}
							<div className="bg-dark-gray rounded-lg p-6 mb-8">
								<div className="relative">
									<input
										type="text"
										placeholder="Search posts..."
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className="w-full bg-black border border-gray-800 rounded px-4 py-2 pl-10 text-white focus:outline-none focus:border-gold"
									/>
									<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
								</div>
							</div>

							{/* Categories */}
							<div className="bg-dark-gray rounded-lg p-6 mb-8">
								<h2 className="font-play text-xl font-bold text-white mb-4">
									Categories
								</h2>
								<ul className="space-y-2">
									{categories.map((category) => (
										<li key={category.name}>
											<button
												onClick={() => setSelectedCategory(category.name)}
												className={`w-full flex items-center justify-between py-2 px-3 rounded transition-colors duration-200 ${
													selectedCategory === category.name
														? 'bg-gold/20 text-gold'
														: 'text-gray-400 hover:text-white'
												}`}
											>
												<span>{category.name}</span>
												<span className="text-sm">{category.count}</span>
											</button>
										</li>
									))}
								</ul>
							</div>
						</div>

						{/* Blog Posts Grid */}
						<div className="lg:col-span-3">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								{currentPosts.map((post) => (
									<Link
										key={post.slug}
										to={`/blog/${post.slug}`}
										className="group bg-dark-gray rounded-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-gold/10"
									>
										<div className="relative h-48 overflow-hidden">
											<img
												src={post.image}
												alt={post.title}
												className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
											/>
											<div className="absolute top-4 left-4">
												<span className="bg-gold/90 text-black text-xs font-bold px-3 py-1 rounded">
													{post.category}
												</span>
											</div>
										</div>

										<div className="p-6">
											<h3 className="font-play text-xl font-bold text-white group-hover:text-gold transition-colors duration-300 mb-3">
												{post.title}
											</h3>

											<p className="text-gray-400 mb-4 line-clamp-2">
												{post.excerpt}
											</p>

											<div className="flex items-center justify-between text-sm text-gray-400">
												<div className="flex items-center">
													<User size={16} className="mr-2" />
													{post.author}
												</div>
												<div className="flex items-center">
													<Calendar size={16} className="mr-2" />
													{new Date(post.date).toLocaleDateString('en-US', {
														year: 'numeric',
														month: 'short',
														day: 'numeric',
													})}
												</div>
											</div>
										</div>
									</Link>
								))}
							</div>

							{/* Pagination */}
							{totalPages > 1 && (
								<div className="flex justify-center mt-12 gap-2">
									{[...Array(totalPages)].map((_, index) => (
										<button
											key={index}
											onClick={() => setCurrentPage(index + 1)}
											className={`w-10 h-10 rounded-full font-medium transition-colors duration-200 ${
												currentPage === index + 1
													? 'bg-gold text-black'
													: 'bg-dark-gray text-white hover:bg-gold/20'
											}`}
										>
											{index + 1}
										</button>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	};

export default BlogPage;