import com.fastcgi.FCGIInterface;

import java.time.format.DateTimeFormatter;
import java.util.*;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

public class Main {

    public static void main(String[] args) {
        FCGIInterface fcgi = new FCGIInterface();
        while (fcgi.FCGIaccept() >= 0) {
            try {
                System.out.println("Content-Type: application/json; charset=utf-8");
                System.out.println();

                String method = FCGIInterface.request.params.getProperty("REQUEST_METHOD");
                if (!"GET".equals(method)) {
                    System.out.println("{\"error\": \"Only GET method is supported\"}");
                    continue;
                }

                String queryString = FCGIInterface.request.params.getProperty("QUERY_STRING");
                if (queryString == null || queryString.trim().isEmpty()) {
                    System.out.println("{\"error\": \"Empty query string\"}");
                    continue;
                }

                LinkedHashMap<String, String> map = getValues(queryString);

                if (!map.containsKey("x") || !map.containsKey("y") || !map.containsKey("r")) {
                    System.out.println("{\"error\": \"Missing parameters. Required: x, y, r\"}");
                    continue;
                }

                try {
                    int x = Integer.parseInt(map.get("x"));
                    float y = Float.parseFloat(map.get("y"));
                    float r = Float.parseFloat(map.get("r"));

                    if (!validate(x, y, r)) {
                        System.out.println("{\"error\": \"Invalid parameters: validation failed\"}");
                        continue;
                    }

                    boolean result = analyzeCords(x, y, r);
                    System.out.println(resp(String.valueOf(x), String.valueOf(y), String.valueOf(r), result));

                } catch (NumberFormatException e) {
                    System.out.println("{\"error\": \"Number format exception\"}");
                }

            } catch (Exception e) {
                System.out.println("{\"error\": \"Server error: " + e.getMessage() + "\"}");
            }
        }
    }

    private static String resp(String x, String y, String r, boolean isShot) {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        return """
                {"x": "%s", "y": "%s", "r": "%s", "result": %s, "time": "%s"}
                """.formatted(x, y, r, String.valueOf(isShot), dtf.format(java.time.LocalDateTime.now()));
    }

    private static LinkedHashMap<String, String> getValues(String inString) {
        LinkedHashMap<String, String> map = new LinkedHashMap<>();
        try {
            String[] args = inString.split("&");
            for (String s : args) {
                String[] arg = s.split("=", 2);
                if (arg.length == 2) {
                    String key = URLDecoder.decode(arg[0], StandardCharsets.UTF_8);
                    String value = URLDecoder.decode(arg[1], StandardCharsets.UTF_8);
                    map.put(key, value);
                }
            }
        } catch (Exception e) {
            System.err.println("Error parsing query string: " + e.getMessage());
        }
        return map;
    }

    private static boolean analyzeCords(int x, float y, float r) {
        return (x >= 0 && y >= 0 && x <= r && y <= r) ||
                (x <= 0 && y >= 0 && (Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r, 2))) ||
                (x <= 0 && y <= 0 && (y >= -1 * x - r));
    }

    public static boolean validate(int x, float y, float r) {
        List<Integer> availableX = Arrays.asList(-5, -4, -3, -2, -1, 0, 1, 2, 3);
        List<Float> availableR = Arrays.asList(1.0f, 1.5f, 2.0f, 2.5f, 3.0f);

        return availableX.contains(x) &&
                (y >= -3 && y <= 5) &&
                availableR.contains(r);
    }
}