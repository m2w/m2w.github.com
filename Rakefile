require 'rake'

#############
# Utils
#############
def name_split(name_string)
	# TODO: make this a little more robust
	ns = name_string.split("&").first.strip
	if /\./ =~ ns
		return ns.split(".").last.strip
	end
	return ns.split.last
end

#############
# Config
#############
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

	puts "Updating ./readinglist.html"
	conf = Jekyll.configuration({})
	s = Jekyll::Site.new(conf)
	s.read_layouts
	readinglist = YAML.load_file("_readings.yml")
	modified = false

	l = []
	readinglist.each do |category, entries|
		e = []
		entries.each do |entry|
			data = entry["data"]
			e = e.push(data)
			if !data.has_key?("link")
				# TODO: generate a new amazon affiliate link for the title
				link = "dummy"
				modified = true
				data.merge!({"link"=>link})
			end
		end

		# sort by author (descending)
		e = e.sort{|x,y| name_split(x["author"]) <=> name_split(y["author"])}
		l = l.push({"name"=>category, "entries"=>e})
	end

	# sort by category (ascending)
	l.sort{|x,y| y["name"] <=> x["name"]}

	if modified
		File.open("_readings.yml", "w+") do |file|
			file.puts(YAML.dump(readinglist))
		end
	end

	payload = {"readinglist"=>l}.deep_merge(s.site_payload)

	FileUtils.cp(File.join(["_skeletons", "readinglist.html"]),
		"readinglist.html")

	p = Jekyll::Page.new(s, s.source, '', 'readinglist.html')
	p.render(s.layouts, payload)
	p.write(s.source)
	puts "Readinglist updated"
end

desc "Generate updated tag lists"
task :tags do
	require 'rubygems'
	require 'jekyll'
	
	puts "Updating tag subpages"
	conf = Jekyll.configuration({})
	s = Jekyll::Site.new(conf)
	s.read

	skel = File.join(["_skeletons", "tag.html"])
	dest = File.join([s.source, "tags"])
	FileUtils.mkdir(dest) if ! File.exist?(dest)

	tag_cloud = []
	tc_path = File.join([dest, "index.html"])
	
	FileUtils.cp(File.join(["_skeletons", "tags.html"]),
		tc_path)
	tc = Jekyll::Page.new(s, s.source, 'tags', "index.html")
	tc.data["title"] = "Tag Cloud"

	tag_count = s.tags.size
	s.tags.each do |tag, posts|
		fname = "#{tag}.html"
		FileUtils.cp(skel, File.join([dest, fname]))
		page = Jekyll::Page.new(s, s.source, 'tags', fname)
		page.data["title"] = "Posts tagged '#{tag}'"
		updated_posts = posts.collect{|p|
			pp = p.clone
			pp.tags = p.tags.reject{|t| t == tag}
			pp
		}.sort{|p1, p2| p2.date <=> p1.date}
		payload = {"tag"=>tag, "p"=>updated_posts}.deep_merge(s.site_payload)

		page.render(s.layouts, payload)
		page.write(s.source)

		weight = posts.size.to_f * tag_count / s.posts.size
		tag_cloud.push({"name"=>tag, "posts"=>updated_posts[0,5], 
			"weight"=>weight})
	end

	tag_cloud = tag_cloud.sort{|d1, d2| 
		d2["weight"] <=> d1["weight"]
	}
	highest = (tag_count * 0.05).ceil
	top = (tag_count * 0.2).ceil
	avg = (tag_count * 0.5).ceil
	rem = avg
	(0..highest).each{ |d| tag_cloud[d]["weight"] = 4 }
	(highest..top).each{ |d| tag_cloud[d]["weight"] = 3 }
	(top..avg).each{ |d| tag_cloud[d]["weight"] = 2 }
	(avg..rem).each{ |d| tag_cloud[d]["weight"] = 1 }
	
	tag_cloud.shuffle!
	tc_payload = {"tag_cloud"=>tag_cloud}.deep_merge(s.site_payload)
	tc.render(s.layouts, tc_payload)
	tc.write(s.source)
	puts "Tag subpages updated"
end

desc "Run jekyll locally"
task :jekyll => [:tags, :readinglist] do
	require 'rubygems'
	require 'jekyll'
	system "jekyll --auto --server"
end