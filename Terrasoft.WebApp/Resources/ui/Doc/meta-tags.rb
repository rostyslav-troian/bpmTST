require "jsduck/tag/tag"

module JsDuck::Tag
    class Virtual < Tag
        def initialize
            @pattern = "virtual"
            @tagname = :virtual
            @signature = {:long => "virtual", :short => "VIR"}
        end
    end
    class Overridden < Tag
        def initialize
            @pattern = ["overridden"]
            @tagname = :overridden
            @signature = {:long => "overridden", :short => "OVERDDN"}
        end
    end
end

require "jsduck/tag/member_tag"

class Message < JsDuck::Tag::MemberTag
  def initialize
    @tagname = :message
    @pattern = "message"
    @member_type = {
      :title => "Messages",
      :position => MEMBER_POS_CFG,
	  :toolbar_title => "Messages"
    }
  end

  def parse_doc(scanner, position)
    return {
      :tagname => :message,
      :name => scanner.ident,
    }
  end

  def process_doc(context, message_tags, position)
    context[:name] = message_tags[0][:name]
  end

  def process_code(code)
    h = super(code)
    h[:params] = code[:params]
    h
  end

  def to_html(message, cls)
    member_link(message) + member_params(message[:params])
  end
end