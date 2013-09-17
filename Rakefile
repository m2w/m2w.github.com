require 'rake'

CONFIG = {
	"posts_dir" => "./_posts",
	"ext" => "md"
}

desc "Create a new skeleton post"
task :post do
	title = ENV["title"] || abort("Please provide a title for the new blog post")
	slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
	filename = File.join(CONFIG['posts_dir'], "#{Time.now.strftime("%Y-%m-%d")}-#{slug}.#{CONFIG['ext']}")
	if File.exists?(filename)
		abort("A post with the same slug already exists.")
	end
	open(filename, 'w') do |post|
		post.puts "---"
		post.puts "title: #{title}"
		post.puts "description: "
		post.puts "tags: []"
		post.puts "layout: post"
		post.puts "---"
	end
end

desc "Generate an updated reading list"
task :readinglist do
	require 'rubygems'
	require 'jekyll'
	# see test.rb
end

desc "Generate updated tag lists"
task :tasks do
	require 'rubygems'
	require 'jekyll'
	# see test.rb
end



desc "Run jekyll locally"
task :jekyll do
	system "jekyll --auto --server"
end