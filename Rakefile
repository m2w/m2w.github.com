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

# taken from http://stackoverflow.com/a/25990044
class ::Hash
    def deep_merge(second)
        merger = proc { |key, v1, v2| Hash === v1 && Hash === v2 ?
    v1.merge(v2, &merger) : [:undefined, nil, :nil].include?(v2) ? v1
    : v2 }
        self.merge(second, &merger)
    end
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
  filename = File.join(CONFIG['posts_dir'],
                       "#{Time.now.strftime("%Y-%m-%d")}-#{slug}.#{CONFIG['ext']}")
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
  rem = tag_count - 1
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

desc "Wrap Abbreviations in abbr"
task :abbr do
    require 'rubygems'
    Dir.foreach(CONFIG['posts_dir']) do |f|
      next if f.start_with?('.')
      file = File.join(CONFIG['posts_dir'], f)
      IO.write(file, File.open(file) do |post|
                 post.read.gsub(/\b([A-Z][A-Z0-9]{2,}s?)\b/, '<abbr>\1</abbr>')
               end)
    end
end

desc "Run jekyll locally"
task :jekyll => [:tags] do
  require 'rubygems'
  require 'jekyll'
  system 'jekyll serve -w -V'
end

desc "Push to github"
task :push => [:tags] do
  require 'rubygems'
  system 'compass compile'
  system 'git push'
end
