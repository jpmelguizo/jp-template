require 'redcarpet'

set :relative_links, true
activate :relative_assets
activate :directory_indexes
activate :syntax

set :css_dir, 'dist/css'
set :js_dir, 'dist/js'
set :layout, 'html'

set :markdown_engine, :redcarpet
set :markdown, fenced_code_blocks: true

page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

configure :build do
  ignore 'sass/*'
  ignore 'js/*'
end

helpers do

  # turns string into safe url
  def to_url(str)
    return ActiveSupport::Inflector.transliterate(str).downcase.gsub(' ','-')
  end

  # creates link with active class in case its href is the current url
  def menu_link(link_text, url, options = {})
    if current_resource.url === "#{url}/" || current_resource.url === "#{url}"
      if options[:class]
        options[:class] << ' active'
      else
        options[:class] = 'active'
      end
    end
    link_to(link_text, url, options)
  end
end

# Gulp
activate :external_pipeline,
  name: :gulp,
  latency: 0,
  command: build? ? './node_modules/gulp/bin/gulp.js build' : './node_modules/gulp/bin/gulp.js default',
  source: ".tmp"
