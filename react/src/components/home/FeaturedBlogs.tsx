import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User } from 'lucide-react';

const FeaturedBlogs: React.FC = () => {
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				const response = await fetch(
					`/api/posts/`
				);
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				setBlogs(data);
				setLoading(false);
			} catch (err) {
				setError('Failed to fetch blogs. Please try again later.');
				setLoading(false);
			}
		};

		fetchBlogs();
	}, []);

	if (loading) {
		return (
			<section className="py-20 bg-gradient-to-b from-black to-dark-gray">
				<div className="container mx-auto px-4">
					<p className="text-white">Loading blogs...</p>
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className="py-20 bg-gradient-to-b from-black to-dark-gray">
				<div className="container mx-auto px-4">
					<p className="text-red-500">{error}</p>
				</div>
			</section>
		);
	}

	return (
		<section className="py-20 bg-gradient-to-b from-black to-dark-gray">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row items-center justify-between mb-12">
					<div>
						<h2 className="font-play text-3xl md:text-4xl font-bold text-white mb-3">
							Latest from our <span className="text-gold">Blog</span>
						</h2>
						<p className="text-gray-400 max-w-xl">
							Stay updated with the latest FiveM development tips, tutorials, and
							news
						</p>
					</div>

					<Link
						to="/blog"
						className="mt-6 md:mt-0 flex items-center font-play font-medium text-gold hover:text-white transition-colors duration-300"
					>
						View All Posts <ArrowRight size={18} className="ml-2" />
					</Link>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{blogs.map((post: any) => (
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
			</div>
		</section>
	);
};

export default FeaturedBlogs;