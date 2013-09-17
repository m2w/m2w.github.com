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
	puts "Regenerating ./readinglist.html"
	File.open("readinglist.html", 'w+') do |file|
		default = ''
		default << <<-HTML
		---
		layout: readinglist.html
		title: An annotated reading list
		---
		{{ content }}
		HTML
		end
	end
	conf = Jekyll.configuration({})
	s = Jekyll::Site.new(conf)
	s.read_layouts
	readinglist = YAML.load_file("_readings.yml")
	payload = {"readinglist"=>readinglist}.deep_merge(s.site_payload)
	p = Jekyll::Page.new(s, s.source, '', 'readinglist.html')
	p.render(payload, s.layouts)
	p.write(s.source)
	puts "Updated ./readinglist.html generated"
end

desc "Run jekyll locally"
task :jekyll do
	system "jekyll --auto --server"
end